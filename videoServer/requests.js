import {Router} from 'express';
import {processVideo} from "./ffmpegProcessing";
import {createServer} from 'http';
import {ports} from "./server";
import {User, Video} from "./models";

let fs = require('fs');
let fse = require('fs-extra');
let HLSServer = require('hls-server');

/* Passport */
let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
passport.use(new BearerStrategy(
    async function(token, done) {
        let user = await User.findOne({where: {token: token}});

        if (!user) {
            return done(null, false);
        }

        return done(null, user, {scope: 'all'});
    },
));

export let router = Router();

//Authorizing requests
router.use(passport.authenticate('bearer', {session: false}));

router.post('/upload', async(req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.fileToUpload;

    let metadata = file.name.match(/(.+)(\.)(\w+)/);

    let name = req.body.name;

    let newVideo = await Video.create({
        name: name,
        userId: req.user.id,
        status: "processing",
        port: undefined,

    });

    res.redirect('http://' + process.env.WEBAPP_SERVER_URL + ':' + process.env.WEBAPP_SERVER_PORT
        + '/video?upload=ok');

    file.mv('videos/' + file.name, async(err) => {
        if (err) {
            console.log(err);
            return;
        }

        let processOk = await processVideo(metadata[1], metadata[3], newVideo.id);

        if (processOk) {
            Video.findOne({
                where: {
                    id: {
                        $eq: newVideo.id,
                    },
                },
            }).then(video => {
                video.status = "ready";

                video.save();

                fs.unlink('videos/' + file.name);
            });
        }

    });
});
router.get('/play', async(req, res) => {

    let video = await Video.findOne({where: {id: req.query.id}});

    if (video.port !== null) {
        console.log(video.name + " played on " + video.port);
        res.send(JSON.stringify({
            port: video.port,
        }));
        return;
    }

    let server = createServer();

    let streaming = 'streams/' + video.id + '/playlist.m3u8';

    new HLSServer(server, {
        path: '/play',     // Base URI to output HLS streams
        dir: streaming // Directory that input files are stored
    });

    for (var item in ports) {
        if (ports[item].available) {
            ports[item].available = false;

            server.listen(ports[item].port);

            video.port = ports[item].port;

            video.save();

            res.send(JSON.stringify({
                port: ports[item].port,
            }));

            return;
        }

    }

});

router.get('/delete', async(req, res) => {

    let id = parseInt(req.query.id);

    let video = await Video.findOne({
        where: {
            id: {
                $eq: id,
            },
        },
    });

    let destroyOk = await video.destroy();

    fse.remove('streams/' + video.id, err => {

        if (!err) {
            fse.remove('public/previews/' + video.id, err => {
                if (!err && destroyOk) {
                    res.redirect('http://' + process.env.WEBAPP_SERVER_URL + ':' + process.env.WEBAPP_SERVER_PORT
                        + '/video?delete=ok');
                }
            });
        }

    });

});

router.get('/available_videos', async(req, res) => {

    let videos = await Video.findAll({
        attributes: ['id', 'name', 'port', 'status', 'createdAt'],
        include: [{
            model: User,
            attributes: ['id', 'username'],
            required: true,
        }],
        where: {
            status: "ready",
        },
    });

    if (videos) {
        res.status(200).send(videos);
    }

});

router.get('/preview', async(req, res) => {

    let previewPath = 'public/previews/' + req.query.id + '/preview.jpg';

    let options = {
        root: __dirname,
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };

    res.sendFile(previewPath, options, err => {
        if (err) {
            console.log(err);
        } else {
            console.log("Img sent successfully");
        }
    });
});

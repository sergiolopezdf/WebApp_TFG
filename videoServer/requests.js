import {Router} from 'express';
import {process} from "./ffmpegProcessing";

let fs = require('fs');
let HLSServer = require('hls-server');
import {createServer} from 'http';
import {ports} from "./server";
import {sequelize, Video, User} from "./models";

let querystring = require('querystring');

export let router = Router();

router.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.fileToUpload;

    file.mv('videos/' + file.name, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        let metadata = file.name.match(/(\w+)(.)(\w+)/);

        process(metadata[1], metadata[3]);

        let newVideo = Video.create({
            name: metadata[1],
            userId: parseInt(req.query.user),
            port: undefined,

        });

        console.log(newVideo);

        res.redirect('http://localhost:3000/video?upload=ok');

    });
});
router.get('/play', (req, res) => {

    let path = 'streams/' + req.query.name;

    Video.findOne({where: {name: req.query.name}})
        .then(video => {
            if (video.port) {
                console.log(req.query.name + " played on " + video.port);
                res.send(JSON.stringify({
                    port: video.port,
                }));
                return;
            }

            let server = createServer();

            new HLSServer(server, {
                path: '/play',     // Base URI to output HLS streams
                dir: 'streams/' + req.query.name + '/playlist.m3u8'  // Directory that input files are stored
            });

            for (var item in ports) {
                if (ports[item].available) {
                    ports[item].available = false;
                    server.listen(ports[item].port);
                    console.log(req.query.name + " listening " + ports[item].port);

                    video.port = ports[item].port;

                    video.save();

                    res.send(JSON.stringify({
                        port: ports[item].port,
                    }));

                    return;
                }

            }

        });

});




import {Router} from 'express';
import {process} from "./ffmpegProcessing";

let fs = require('fs');
let HLSServer = require('hls-server');
import {createServer} from 'http';
import {ports} from "./server";
//import {server} from "./server";

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
        res.status(200).send('File Uploaded');

        let metadata = file.name.match(/(\w+)(.)(\w+)/);

        process(metadata[1], metadata[3]);

        return;
    });
});
router.get('/play', (req, res) => {

    let path = 'streams/' + req.query.name;

    console.log(path);

    if (!fs.existsSync(path)) {
        console.log("No existe");
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
            console.log(req.query.name + " played on " + ports[item].port);

            res.send(JSON.stringify({
                port: ports[item].port,
            }));

            return;
        }

    }

});




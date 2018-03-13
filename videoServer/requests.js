import {Router} from 'express';
import {server} from "./server";

let fs = require('fs');
let HLSServer = require('hls-server');

export let router = Router();

router.get('/', () => {

});

router.get('/:videoName', (req, res) => {

    let path = 'streams/' + req.params.videoName;

    if (!fs.existsSync(path)) {
        console.log("No existe");
        return;
    }

    let hls = new HLSServer(server, {
        path: '/' + req.params.videoName,     // Base URI to output HLS streams
        dir: 'streams/' + req.params.videoName + '/playlist.m3u8'  // Directory that input files are stored
    });

});

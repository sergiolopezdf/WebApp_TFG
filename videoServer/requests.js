import {Router} from 'express';
import {server} from "./server";
import {process} from "./ffmpegProcessing";

let fs = require('fs');
let HLSServer = require('hls-server');

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
})
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

    return;

});




import {createServer} from 'http';

var HLSServer = require('hls-server');
import {process} from './ffmpegProcessing';

//process('lbl', 'MOV');

let server = createServer();

let hls = new HLSServer(server, {
    path: '/s',     // Base URI to output HLS streams
    dir: 'streams/lbl/lbl.m3u8'  // Directory that input files are stored
});

server.listen(8000);

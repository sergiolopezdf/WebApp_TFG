//Imports
let HLSServer = require('hls-server');
import {createServer} from 'http';

//Class
class videoServer {
    constructor() {
        let server = createServer();
        let hls = new HLSServer(server, {
            path: '/s',     // Base URI to output HLS streams
            dir: 'streams/lbl/playlist.m3u8'  // Directory that input files are stored
        });

    }

    run() {

        server.listen(8000);

    }

}

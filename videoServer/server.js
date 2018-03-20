let express = require('express');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
import {router} from "./requests";
import {createServer} from 'http';
import {sequelize} from "./models";

// Creating router for handling video requests
let app = express();
export let server = createServer(app);
let port = process.env.VIDEO_SERVER_PORT || '8000';

//Available ports for streaming
export let ports = [];

for (var i = 8001; i < 8031; i++) {
    ports.push({
        port: i,
        available: true,
    });
}



//Port
app.set('port', port);

//FileUpload
app.use(fileUpload());

//QueryURL
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Router listening
server.listen(port, function() {
    console.log('Video server listening for requests on: ' + port);
});

// Rendering routes
app.use('/', router);

/*sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });*/


/*
import {process} from './ffmpegProcessing';

process('lbl', 'MOV');
*/

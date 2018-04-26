let express = require('express');
let bodyParser = require('body-parser');
let expressSanitizer = require('express-sanitizer');
import {router} from "./requests";
import {createServer} from 'http';

// Creating router for handling video requests
let app = express();
export let server = createServer(app);
let port = process.env.FORUM_SERVER_PORT || '5000';

//Port
app.set('port', port);

//QueryURL

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressSanitizer());

//Allowing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Router listening
server.listen(port, function() {
    console.log('Forum server listening for requests on: ' + port);
});

// Rendering routes
app.use('/', router);

// import sha256 from 'crypto-js/sha256';
// import Hex from 'crypto-js/enc-hex';

var sha256 = require("crypto-js/sha256");
var Hex = require("crypto-js/enc-hex");

function digestPassword(password) {
    return sha256(password).toString(Hex);
}

exports.digestPassword = digestPassword;

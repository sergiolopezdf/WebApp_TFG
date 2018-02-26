import {SHA256} from 'crypto-js';

export function digestPassword(password) {
    return SHA256(password);
}

export function checkPassword(hash, password) {

    return digestPassword(password) === hash;

}

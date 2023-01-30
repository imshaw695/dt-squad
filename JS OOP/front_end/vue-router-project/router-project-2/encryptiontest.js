import CryptoJS from 'crypto-js';
import { enc } from 'crypto-js/core';

const key = "123456!%^";
const string = "password";

const encrypted_string = CryptoJS.AES.encrypt(string, key)

console.log(encrypted_string);
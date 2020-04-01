import axios from 'axios';

exports.API = axios.create({
    baseURL: 'http://1d2bd0f2.ngrok.io',
    responseType: "json",
});

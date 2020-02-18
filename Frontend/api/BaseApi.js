import axios from 'axios';

exports.API = axios.create({
    // baseURL: 'https://clubfinitybackend.azurewebsites.net',
    baseURL: 'http://84852744.ngrok.io',
    responseType: "json",
});

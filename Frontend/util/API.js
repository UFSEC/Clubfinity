import axios from 'axios';

exports.API = axios.create({
    baseURL: 'https://clubfinitybackend.azurewebsites.net',
    responseType: "json",
});



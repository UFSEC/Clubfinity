import axios from 'axios';

export default axios.create({
    baseURL: 'https://clubfinitybackend.azurewebsites.net',
    responseType: "json"
})
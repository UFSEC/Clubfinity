import axios from 'axios';

const API = axios.create({
  baseURL: 'http://51cafdc8c85e.ngrok.io',
  responseType: 'json',
});

export default API;

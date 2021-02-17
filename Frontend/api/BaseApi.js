import axios from 'axios';

const API = axios.create({
  baseURL: 'http://39d03c85cfe8.ngrok.io',
  responseType: 'json',
});

export default API;

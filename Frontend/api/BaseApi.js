import axios from 'axios';

const API = axios.create({
  baseURL: 'http://1bec48d53014.ngrok.io',
  responseType: 'json',
});

export default API;

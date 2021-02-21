import axios from 'axios';

const API = axios.create({
  baseURL: 'http://68728b43b83c.ngrok.io/',
  responseType: 'json',
});

export default API;

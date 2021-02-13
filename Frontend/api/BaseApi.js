import axios from 'axios';

const API = axios.create({
  baseURL: 'http://e63abd92b621.ngrok.io',
  responseType: 'json',
});

export default API;

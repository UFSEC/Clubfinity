import axios from 'axios';

const API = axios.create({
  baseURL: 'http://f77e2060cab1.ngrok.io',
  responseType: 'json',
});

export default API;

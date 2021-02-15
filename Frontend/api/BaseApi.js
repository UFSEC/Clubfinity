import axios from 'axios';

const API = axios.create({
  baseURL: 'http://bb5bb03a5567.ngrok.io',
  responseType: 'json',
});

export default API;

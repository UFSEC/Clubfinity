import axios from 'axios';

const API = axios.create({
  baseURL: 'http://35.192.152.56:8080',
  responseType: 'json',
});

export default API;

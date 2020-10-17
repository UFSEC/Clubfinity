import axios from 'axios';

const API = axios.create({
  baseURL: 'http://35.239.190.149:8080',
  responseType: 'json',
});

export default API;

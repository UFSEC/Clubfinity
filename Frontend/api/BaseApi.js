import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
});

export default API;

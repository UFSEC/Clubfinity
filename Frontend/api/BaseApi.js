import axios from 'axios';

const API = axios.create({
  baseURL: 'http://34.121.184.156:8080/',
  responseType: 'json',
});

export default API;

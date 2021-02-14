import axios from 'axios';

const API = axios.create({
  baseURL: 'http://83ed68876f01.ngrok.io',
  responseType: 'json',
});

export default API;

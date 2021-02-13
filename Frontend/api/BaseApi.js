import axios from 'axios';

const API = axios.create({
  baseURL: 'http://65ac0016eac7.ngrok.io',
  responseType: 'json',
});

export default API;

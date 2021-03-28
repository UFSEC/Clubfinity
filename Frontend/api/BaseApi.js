import axios from 'axios';
import config from '../Config/config';

const API = axios.create({
  baseURL: config.url,
  responseType: 'json',
});

export default API;

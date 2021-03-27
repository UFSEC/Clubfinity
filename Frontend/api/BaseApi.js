import axios from 'axios';
import config from '../Config/config';

const API = axios.create({
  baseURL: 'http://localhost:8080/',
  responseType: 'json',
});

export default API;

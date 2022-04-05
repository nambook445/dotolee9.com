import axios from 'axios';
const DOMAIN = 'http://localhost:8080';
const API = axios.create({
  baseURL: DOMAIN,
  headers: {
    withCredentials: true,
    timeout: 3000
  }
});
export default API;

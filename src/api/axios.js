import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this URL is correct
});

export default instance;

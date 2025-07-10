import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://expense-visualizer-r84u.onrender.com/api', // Your backend URL
});

export default instance;

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/json?',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    }
});

export default instance;
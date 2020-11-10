import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://fir-app-a71dd.firebaseio.com/'
});

export default instance;
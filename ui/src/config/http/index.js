import Axios from 'axios';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const baseURL = process.env.REACT_APP_DEKODE_API || 'http://localhost:9000';

const http = Axios.create({
    baseURL,
    headers
});

http.interceptors.response.use(response => Promise.resolve(response.data));

export default http;

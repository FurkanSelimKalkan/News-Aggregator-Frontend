import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

export default {
    getNews() {
        return axios.get(`${BASE_URL}/news`)
    }
}


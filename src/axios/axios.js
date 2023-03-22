import axios from 'axios';
import {baseUrl} from '../constants/BaseURL'
const instance = axios.create({
    baseURL:baseUrl,
});
export default instance;
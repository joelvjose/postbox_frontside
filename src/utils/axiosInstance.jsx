import axios from 'axios';

const accessToken = localStorage.getItem('access_token');

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000',
	headers: {
		Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
	},
});

export default axiosInstance
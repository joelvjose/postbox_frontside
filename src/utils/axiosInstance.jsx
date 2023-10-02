import axios from 'axios';
// import { UseSelector, useSelector } from 'react-redux';

const accessToken = localStorage.getItem('access_token');
// const {accessToken} = useSelector(state=>state.user)

const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000',
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${accessToken}`,
	},
});

export default axiosInstance

// const getAccessToken = async () => {
// 	const accessToken = await localStorage.getItem('access_token');
// 	return accessToken;
//   };
  
//   const createAxiosInstance = async () => {
// 	const accessToken = await getAccessToken();
  
// 	const axiosInstance = axios.create({
// 	  baseURL: 'http://127.0.0.1:8000',
// 	  headers: {
// 		Accept: 'application/json',
// 		Authorization: `Bearer ${accessToken}`,
// 	  },
// 	});
  
// 	return axiosInstance;
//   };
  
//   export default createAxiosInstance;
  



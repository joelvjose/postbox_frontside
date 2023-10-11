// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import axiosInstance from '../utils/axiosInstance';


const likePostApi = async (postId, fetchData) => {
    try {
      // const accessToken = localStorage.getItem('access_token');
      // let body = {}
      // const response = await axios.post(`${BASE_URL}/api/post/like/${postId}/`,body,{
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${accessToken}`
      //   },
      // });
      const response = await axiosInstance({
        url: `/post/like/${postId}/`,
        method: "POST",
      });
      if (response.status === 200) {
        console.log('Post like toggled successfully');
        if (fetchData) {
          fetchData(); 
        }
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export default likePostApi;
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import axiosInstance from '../utils/axiosInstance';


const reportPostApi = async (postId,fetchData) => {
try{
    
        // let accessToken = localStorage.getItem('access_token');
        // const response= await axios.post(`${BASE_URL}/api/post/report/${postId}/`, {}, {
        //     headers: {
        //         Accept :'application/json',
        //         Authorization :`Bearer ${accessToken}`
        //     },
        // });
        const response = await axiosInstance({
            url: `/post/report/${postId}/`,
            method: "POST",
          });
        if(response.status === 200){
            console.log('post reported');
            if (fetchData) {
                fetchData(); 
              }
              return response.data
        }else{
            console.log(response.error);
        }

    }catch (error){
        console.log(error);
    }

}

export default reportPostApi

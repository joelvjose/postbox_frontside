// import axios from "axios"
// import { BASE_URL } from "../utils/constants"
import axiosInstance from '../utils/axiosInstance';


const deletePostApi = async (postId,fetchData) => {
  try{
    // const accessToken = localStorage.getItem('access_token');
    // const response = await axios.delete(`${BASE_URL}/api/post/delete-post/${postId}`,{
    //   headers: {
    //     Accept:'application/json',
    //     Authorization : `Bearer ${accessToken}`, 
    //   },
    // })
    const response = await axiosInstance({
      url: `/post/create-post/delete-post/${postId}`,
      method: "DELETE",
    });
    if(response.status === 200){
        console.log('item deleted.!');
        if(fetchData){
          fetchData();
        }
      }
      else{
        console.log(response.error);
      }
  }
  catch(error){
    console.log(error);
  }
};

export default deletePostApi

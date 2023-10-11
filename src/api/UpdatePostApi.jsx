// import axios from "axios"
// import { BASE_URL } from "../utils/constants"
import axiosInstance from '../utils/axiosInstance';


const UpdatePostApi = async (postId,content, postImage,fetchData) => {
  try{
    const formData =new FormData();
    if(content) formData.append('body',content);
    if(postImage) formData.append('img',postImage);
    
    // const accessToken = localStorage.getItem('access_token');
    // const response = await axios.post(`${BASE_URL}/api/post/update-post/${postId}/`,formData,{
    //   headers:{
    //       Accept:'application/json',
    //       Authorization:`Bearer ${accessToken}`,
    //   },
    // });
    const response = await axiosInstance({
      url: `/post/update-post/${postId}/`,
      method: "POST",
      body:formData,
    });

    if(response.status === 200){
      console.log('updated sucessfully');
      if(fetchData){
        fetchData();
      }
    }
    else{
      console.log(response.error);
    }
  }
catch(error){
  console.error(error);
}
}
export default UpdatePostApi

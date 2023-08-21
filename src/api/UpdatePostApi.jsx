import axios from "axios"
import { BASE_URL } from "../utils/constants"

const UpdatePostApi = async (postId,image,caption,fetchData) => {
  try{
    const accessToken = localStorage.getItem('access_token');
    const formData =new FormData();
    if(caption) formData.append('body',caption);
    if(image) formData.append('img',image);
    
    const response = await axios.post(`${BASE_URL}/post/update-post/${postId}`,formData,{
      headers:{
          Accept:'application/json',
          Authorization:`Bearer ${accessToken}`,
      },
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

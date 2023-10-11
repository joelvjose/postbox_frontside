// import axios from 'axios'
// import {BASE_URL} from '../utils/constants'
import axiosInstance from '../utils/axiosInstance';


const createPostApi = async (content, postImage) => {
    try {
        // const accessToken = localStorage.getItem('access_token');
        // const formData = new FormData();
        // formData.append('body', content);
        // formData.append('img', postImage);

        // const response = await axios.post(`${BASE_URL}/api/post/create-post/`, formData, {
        //     headers: {
        //       Accept: 'application/json',
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   });
          
          const formData = new FormData();
          formData.append('body', content);
          formData.append('img', postImage);

          const response = await axiosInstance({
            url: '/post/create-post/',
            method: "POST",
            body:formData,
          });

          if (response.status === 201) {
            return response.data;
          } else {
            console.log(response.error);
          }
    }
    catch(error){
        console.log(error);
    }
}

export default createPostApi

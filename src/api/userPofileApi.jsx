// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
import axiosInstance from '../utils/axiosInstance';


const userPofileApi = async (email) => {
    try {
        // const accessToken = localStorage.getItem('access_token');
        // const response = await axios.get(`${BASE_URL}/api/post/profile/${email}/`, {
        //   headers: {
        //     Accept: 'application/json',
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
        const response = await axiosInstance({
          url: `/post/profile/${email}/`,
          method: "GET",
        });
    
        if (response.status === 200) {
          console.log('profile',response.data);
            return response.data;
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.error(error);
      }
}

export default userPofileApi




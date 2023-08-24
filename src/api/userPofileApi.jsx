import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const userPofileApi = async (email) => {
    try {
        const accessToken = localStorage.getItem('access_token');
    
        const body = {}
    
        const response = await axios.post(`${BASE_URL}/post/profile/${email}/`, body, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
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




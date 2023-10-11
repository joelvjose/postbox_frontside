// import axios from 'axios'
// import {BASE_URL} from '../utils/constants'
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';


const userListApi = async () => {
    try{
        // const accessToken = localStorage.getItem('access_token');
        // const response = await axios.get(`${BASE_URL}/api/userslist/`, {
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // });
        const response = await axiosInstance({
          url: '/userslist/',
          method: "GET",
        });
        if  (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            console.log(response.error)
        }
        console.log(response.data);
      }
      catch(error){
        console.error(error);
        toast.error("Failed fetching User details.!",{
            position:'top-center',
        })
      }
}

export default userListApi

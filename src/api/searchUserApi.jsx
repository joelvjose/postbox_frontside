

import axiosInstance from "../utils/axiosInstance";

const searchUserApi = async (key) => {
    try {
        const formData = new FormData();
        formData.append('key', key);

      const response = await axiosInstance({
        url: '/post/search/',
        method: "POST",
        data:formData,
      });
      if (response.status === 200) {
        console.log("search", response.data);
        return response.data;
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

export default searchUserApi
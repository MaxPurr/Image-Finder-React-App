import axios from "axios";


export const request = async (searchQuery, page) => {
  const response = await axios.get("https://pixabay.com/api/?key=32897793-60dbf183924c0887bd9576dfe&q=car");
  return response.data;
};

const exportedObject = {
    request,
};

export default exportedObject;
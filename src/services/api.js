import axios from "axios";

export const request = async (searchQuery, page) => {
  const response = await axios.get('https://pixabay.com/api', {
            params: {
                key: '32897793-60dbf183924c0887bd9576dfe',
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 12,
                page: page,
            }
  });
  return response.data;
};

const exportedObject = {
    request,
};

export default exportedObject;
import axios from "axios";

const Base_URL = "https://pipedapi.kavin.rocks";
const options = {
  params: {
    region: 'IN',
    maxResults: '50',
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${Base_URL}/${url}`, options);
  return data;
};

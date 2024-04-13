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
// const Base_URL = "https://youtube-v31.p.rapidapi.com";
// const options = {
//   params: {
//     regionCode: 'IN',
//     maxResults: '50',
//   },
//   headers: {
//     "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_KEY,
//     "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
//   },
// };

// export const fetchFromAPI = async (url) => {
//   const { data } = await axios.get(`${Base_URL}/${url}`, options);
//   return data;
// };

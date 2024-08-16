import axios from "axios";

const urls = [
  "https://pipedapi.kavin.rocks",
  "https://pipedapi-libre.kavin.rocks",
];
const options = {
  params: {
    region: "IN",
    maxResults: "50",
  },
};

export const fetchFromAPI = async (url) => {
  const fetchPromises = urls.map((u) => axios.get(`${u}/${url}`, options));
  const { data } = await Promise.any(fetchPromises);
  return data;
};

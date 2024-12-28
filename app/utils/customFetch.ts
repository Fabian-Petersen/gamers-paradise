import axios from "axios";

const customFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default customFetch;

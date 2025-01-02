import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api", // Use relative URL to our Next.js API route
  headers: {
    "Content-Type": "application/json",
  },
});

export default customFetch;

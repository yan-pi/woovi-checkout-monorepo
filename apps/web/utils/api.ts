import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export const api = axios.create({
  baseURL: API_HOST,
});

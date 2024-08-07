import axios from "axios";

export const api = axios.create({
  baseURL: "https://letalk-server-challenge.onrender.com"
});

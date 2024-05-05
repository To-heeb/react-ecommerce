import axios from "axios";
import { apiToken } from "./LocalStorageUtils";

const token = apiToken()

export const api = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API_BASE_URL,
    withCredentials: false,
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
  });


  export const api_auth = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: false,
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

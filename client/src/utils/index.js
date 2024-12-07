import axios from "axios";

export const api = axios.create({});

export const privateApi = axios.create({
  withCredentials: true
});

import axios from "axios";

export const baseAxios = axios.create({
  baseURL: "https://api.centalki.com/v1",
  // baseURL: "http://localhost:4000/v1",
});

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const error = err.response?.data;
    if (error) {
      return Promise.reject(error);
    } else {
      return Promise.reject(err);
    }
  }
);

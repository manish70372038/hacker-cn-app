import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN SEND:", token);   // 👈 add this
  console.log("URL:", req.url);        // 👈 add this

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
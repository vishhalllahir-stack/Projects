import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});


/* =========================
   REQUEST INTERCEPTOR
========================= */

API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


/* =========================
   RESPONSE INTERCEPTOR
========================= */

API.interceptors.response.use(

  (response) => {
    return response;
  },


  (error) => {

    // JWT expired / invalid
    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");

      localStorage.removeItem("user");


      if (
        window.location.pathname !==
          "/login" &&
        window.location.pathname !==
          "/register"
      ) {
        window.location.href =
          "/login";
      }
    }


    return Promise.reject(error);
  }
);


export default API;
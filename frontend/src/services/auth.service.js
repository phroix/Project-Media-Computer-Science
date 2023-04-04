/*
  -use backend login endpoints
*/

import axios from "axios";

const API_URL = "http://localhost:8800/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const loginRFID = (rfid) => {
  return axios
    .post(API_URL + "loginRFID", {
      rfid,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  loginRFID,
  logout,
  getCurrentUser,
};

export default AuthService;

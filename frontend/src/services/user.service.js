/*
  -use backend user endpoints
*/
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8800";

const create = (data) => {
  return axios.post(API_URL + "/users", data, { headers: authHeader() });
};

const getUserByUsername = (username) => {
  return axios.get(API_URL + `/users/?username=${username}`, {
    headers: authHeader(),
  });
};

const getUsersList = () => {
  return axios.get(API_URL + `/users/list`, { headers: authHeader() });
};

const getUserById = (user_id) => {
  return axios.get(API_URL + `/users/${user_id}`, { headers: authHeader() });
};

const updateUser = (user_id, data) => {
  return axios.put(API_URL + `/users/${user_id}`, data, {
    headers: authHeader(),
  });
};

const updateUserCredit = (user_id, data) => {
  return axios.put(API_URL + `/users/credit/${user_id}`, data, {
    headers: authHeader(),
  });
};

const deleteUser = (user_id) => {
  return axios.delete(API_URL + `/users/${user_id}`, { headers: authHeader() });
};

const UserService = {
  create,
  getUserByUsername,
  getUsersList,
  getUserById,
  updateUser,
  updateUserCredit,
  deleteUser,
};

export default UserService;

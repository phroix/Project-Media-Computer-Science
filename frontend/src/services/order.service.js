/*
  -use backend order endpoints
*/
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8800";

const createOrder = (user_id, data) => {
  return axios.post(API_URL + `/orders/${user_id}`, data);
};

const getOrderByDate = (user_id, date) => {
  return axios.get(API_URL + `/orders/${user_id}?date=${date}`, {
    headers: authHeader(),
  });
};

const OrderService = {
  createOrder,
  getOrderByDate,
};

export default OrderService;

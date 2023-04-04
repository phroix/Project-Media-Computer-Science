/*
  -use backend credit endpoints
*/
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8800";

const getCreditByDate = (user_id, date) => {
  return axios.get(API_URL + `/credits/${user_id}?date=${date}`, {
    headers: authHeader(),
  });
};

const CreditService = {
  getCreditByDate,
};

export default CreditService;

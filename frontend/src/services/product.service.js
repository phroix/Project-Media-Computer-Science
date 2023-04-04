/*
  -use backend product endpoints
*/
import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8800";

const create = (data) => {
  return axios.post(API_URL + "/products", data, { headers: authHeader() });
};

const getProductByName = (name) => {
  return axios.get(API_URL + `/products?name=${name}`, {
    headers: authHeader(),
  });
};

const getProductsList = () => {
  return axios.get(API_URL + `/products/list`);
};

const updateProduct = (product_id, data) => {
  return axios.put(API_URL + `/products/${product_id}`, data, {
    headers: authHeader(),
  });
};

const deleteProduct = (product_id) => {
  return axios.delete(API_URL + `/products/${product_id}`, {
    headers: authHeader(),
  });
};

const ProductService = {
  create,
  getProductByName,
  getProductsList,
  updateProduct,
  deleteProduct,
};

export default ProductService;

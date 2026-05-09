import api from "./axiosConfig";

// GET ALL PRODUCTS
// productApi.js
export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data; // 🔥 return ONLY data
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
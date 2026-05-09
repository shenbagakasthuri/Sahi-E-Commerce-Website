import api from "./apiClient";

export const placeOrder = (userId) => {
  return api.post(`/orders/${userId}`);
};

export const getOrders = (userId) => {
  return api.get(`/orders/${userId}`);
};
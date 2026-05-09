import api from "./axiosConfig";

export const getCart =
  async (userId) => {

    const res =
      await api.get(
        `/cart/${userId}`
      );

    return res.data;
};

export const addToCart =
  async ({
    userId,
    productId,
    quantity
  }) => {

    const res =
      await api.post(
        `/cart?userId=${userId}&productId=${productId}&quantity=${quantity}`
      );

    return res.data;
};

export const removeFromCart =
  async (id) => {

    await api.delete(
      `/cart/${id}`
    );
};
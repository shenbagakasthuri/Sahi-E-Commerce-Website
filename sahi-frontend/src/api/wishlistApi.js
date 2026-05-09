import axios from "axios";


const API =
  "http://localhost:8080/api/wishlist";


const token =
  localStorage.getItem(
    "token"
  );


const authHeader = {

  headers: {

    Authorization:
      `Bearer ${token}`
  }
};



// GET
export const getWishlist =
  async (userId) => {

    const res =
      await axios.get(

        `${API}/${userId}`,

        authHeader
      );

    return res.data;
  };



// ADD
export const addToWishlist =
  async (

    userId,

    productId

  ) => {

    const res =
      await axios.post(

        `${API}?userId=${userId}&productId=${productId}`,

        {},

        authHeader
      );

    return res.data;
  };



// DELETE
export const removeFromWishlist =
  async (id) => {

    const res =
      await axios.delete(

        `${API}/${id}`,

        authHeader
      );

    return res.data;
  };
import { useState, useEffect } from "react";

import {
  placeOrder,
  getOrders
} from "../api/orderApi";

const USER_ID = 1;

export function useOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const res = await getOrders(USER_ID);

      setOrders(res.data || []);

    } catch (error) {

      console.error(
        "Orders fetch error:",
        error
      );
    }
  };


  useEffect(() => {

    Promise.resolve()
      .then(fetchOrders);

  }, []);


  const createOrder = async () => {

    try {

      await placeOrder(USER_ID);

      await fetchOrders();

      return true;

    } catch (error) {

      console.error(
        "Place order error:",
        error
      );

      return false;
    }
  };


  return {

    orders,

    createOrder,

    fetchOrders
  };
}
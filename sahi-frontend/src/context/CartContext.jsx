import {
  createContext,
  useState,
  useEffect
} from "react";

import {
  getCart,
  addToCart,
  removeFromCart
} from "../api/cartApi";


// eslint-disable-next-line react-refresh/only-export-components
export const CartContext =
  createContext();


const USER_ID = 1;


export default function CartProvider({
  children
}) {

  const [cartItems,
    setCartItems] =
      useState([]);


  const fetchCart =
    async () => {

      try {

        const data =
          await getCart(
            USER_ID
          );

        setCartItems(
          data || []
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };


  useEffect(() => {

    async function loadCart() {

      await fetchCart();
    }

    loadCart();

  }, []);



  const addItem =
    async (product) => {

      await addToCart({

        userId:
          USER_ID,

        productId:
          product.id,

        quantity:
          1
      });

      await fetchCart();
    };



  const removeItem =
    async (id) => {

      await removeFromCart(
        id
      );

      await fetchCart();
    };



  return (

    <CartContext.Provider
      value={{

        cartItems,

        addItem,

        removeItem,

        fetchCart
      }}
    >

      {children}

    </CartContext.Provider>
  );
}
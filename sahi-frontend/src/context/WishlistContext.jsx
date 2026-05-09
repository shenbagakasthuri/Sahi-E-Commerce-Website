import {
  createContext,
  useState,
  useEffect
} from "react";

import {

  getWishlist,
  addToWishlist,
  removeFromWishlist

} from "../api/wishlistApi";


// eslint-disable-next-line react-refresh/only-export-components
export const WishlistContext =
  createContext();


const USER_ID = 1;


export default function WishlistProvider({
  children
}) {

  const [wishlist,
    setWishlist] =
      useState([]);


  const refresh =
    async () => {

      try {

        const data =
          await getWishlist(
            USER_ID
          );

        setWishlist(
          data || []
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };


  useEffect(() => {

    async function loadWishlist() {

      await refresh();
    }

    loadWishlist();

  }, []);



  const addItem =
    async (product) => {

      await addToWishlist(

        USER_ID,

        product.id
      );

      await refresh();
    };



  const removeItem =
    async (id) => {

      await removeFromWishlist(
        id
      );

      await refresh();
    };



  return (

    <WishlistContext.Provider
      value={{

        wishlist,

        addItem,

        removeItem,

        refresh
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}
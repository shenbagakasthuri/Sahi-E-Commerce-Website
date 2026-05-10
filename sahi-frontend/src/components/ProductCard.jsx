import {

  FiHeart,
  FiShoppingCart,
  FiStar

} from "react-icons/fi";


import {

  useNavigate

} from "react-router-dom";


import "../styles/ProductCard.css";


import {

  useCart

} from "../hooks/useCart";


import {

  useWishlist

} from "../hooks/useWishlist";


import {

  useToast

} from "../context/ToastContext";




function ProductCard({
  product
}) {


  const navigate =
    useNavigate();




  const {

    addItem: addToCart,

    fetchCart

  } = useCart();




  const {

    wishlist = [],

    addItem:
      addToWishlist,

    removeItem:
      removeFromWishlist,

    refresh

  } = useWishlist();




  const {
    showToast
  } = useToast();




  const isInWishlist =

    wishlist.some(

      (item) =>

        item?.product?.id ===

        product?.id
    );





  const handleAddToCart =
    async () => {

      try {

        await addToCart(
          product
        );


        await fetchCart();


        showToast(
          "🛒 Added to cart"
        );

      }

      catch (error) {

        console.error(
          error
        );

        showToast(
          "❌ Cart error"
        );
      }
    };







  const handleWishlist =
    async () => {

      try {


        if (
          isInWishlist
        ) {


          const existingItem =

            wishlist.find(

              (item) =>

                item?.product?.id ===

                product?.id
            );



          await removeFromWishlist(

            existingItem?.id
          );



          await refresh();


          showToast(

            "💔 Removed from wishlist"
          );

        }

        else {


          await addToWishlist(
            product
          );


          await refresh();


          showToast(

            "❤️ Added to wishlist"
          );
        }

      }

      catch (error) {

        console.error(
          error
        );


        showToast(

          "❌ Wishlist error"
        );
      }
    };






  return (


    <div className="product-card">



      {/* WISHLIST */}

      <button

        className=
          "wishlist-btn"

        onClick={
          handleWishlist
        }
      >

        <FiHeart

          className={

            isInWishlist

              ? "liked"

              : ""
          }
        />

      </button>








      {/* IMAGE */}

      <div

        className=
          "product-image"

        onClick={() =>

          navigate(

            `/product/${product?.id}`
          )
        }
      >


        <img

          src={
            product?.image
          }

          alt={
            product?.name
          }

        />


      </div>








      {/* INFO */}

      <div className="product-info">


        <span
          className=
            "category"
        >

          {
            product?.category
          }

        </span>




        <h3>

          {
            product?.name
          }

        </h3>





        <div
          className=
            "rating-box"
        >

          <FiStar />

          {

            product?.rating ||

            "4.5"
          }

        </div>





        <p className="price">

          ₹

          {
            product?.price
          }

        </p>





      </div>








      {/* ACTION */}

      <button

        className=
          "cart-btn"

        onClick={
          handleAddToCart
        }
      >

        <FiShoppingCart />

        Add to Cart

      </button>



    </div>
  );
}



export default ProductCard;
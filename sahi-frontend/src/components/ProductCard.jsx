import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

import {
  FiHeart,
  FiShoppingCart
} from "react-icons/fi";

import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

import { useToast } from "../context/ToastContext";

function ProductCard({ product }) {

  const navigate = useNavigate();

  const {
    addItem: addToCart,
    fetchCart
  } = useCart();


  const {
    wishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    refresh
  } = useWishlist();


  const { showToast } = useToast();


  const isInWishlist =
    wishlist.some(
      (item) =>
        item.product?.id === product.id
    );


  // CART
  const handleAddToCart = async () => {

    try {

      await addToCart(product);

      await fetchCart();

      showToast("🛒 Added to cart");

    } catch (error) {

      console.error(error);

      showToast("❌ Cart error");
    }
  };



  // WISHLIST
  const handleWishlist = async () => {

    try {

      if (isInWishlist) {

        const existingItem =
          wishlist.find(
            (item) =>
              item.product?.id === product.id
          );

        await removeFromWishlist(
          existingItem.id
        );

        await refresh();

        showToast("💔 Removed from wishlist");

      } else {

        await addToWishlist(product);

        await refresh();

        showToast("❤️ Added to wishlist");
      }

    } catch (error) {

      console.error(error);

      showToast("❌ Wishlist error");
    }
  };


  return (

    <div className="product-card">

      <div
        className="product-image"
        onClick={() =>
          navigate(`/product/${product.id}`)
        }
        style={{ cursor: "pointer" }}
      >

        <img
          src={product.image}
          alt={product.name}
        />

      </div>


      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="price">
          ₹{product.price}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

      </div>


      <div className="product-actions">

        <button
          className="wishlist"
          onClick={handleWishlist}
        >

          <FiHeart
            style={{
              color:
                isInWishlist
                  ? "red"
                  : "black"
            }}
          />

        </button>


        <button
          className="cart"
          onClick={handleAddToCart}
        >

          <FiShoppingCart />

          <span>Add</span>

        </button>

      </div>

    </div>
  );
}

export default ProductCard;
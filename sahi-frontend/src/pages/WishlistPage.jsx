import "../styles/WishlistPage.css";

import {
  useWishlist
} from "../hooks/useWishlist";

import {
  useCart
} from "../hooks/useCart";


function WishlistPage() {

  const {

    wishlist,

    removeItem

  } = useWishlist();

  const {

    addItem

  } = useCart();


  console.log(
    "WISHLIST:",
    wishlist
  );


  return (

    <div className="wishlist-page">

      <h2>
        Your Wishlist ❤️
      </h2>


      {wishlist.length === 0 ? (

        <p className="empty-text">
          No items in wishlist
        </p>

      ) : (

        wishlist.map((item) => (

          <div

            key={item.id}

            className=
              "wishlist-item"

          >

            <img

              src={
                item.product.image
              }

              alt={
                item.product.name
              }

            />


            <div className="wishlist-info">

              <h4>

                {
                  item.product.name
                }

              </h4>


              <p>

                ₹

                {
                  item.product.price
                }

              </p>

            </div>


            <div className="actions">

              <button

                className=
                  "cart-btn"

                onClick={() =>

                  addItem(
                    item.product
                  )

                }

              >

                Add to Cart

              </button>


              <button

                className=
                  "remove-btn"

                onClick={() =>

                  removeItem(
                    item.id
                  )

                }

              >

                Remove

              </button>

            </div>

          </div>

        ))

      )}

    </div>
  );
}


export default WishlistPage;
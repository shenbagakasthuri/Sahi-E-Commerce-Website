import "../styles/CartPage.css";

import { useNavigate }
  from "react-router-dom";

import { useCart }
  from "../hooks/useCart";


function CartPage() {

  const navigate =
    useNavigate();


  const {

    cartItems,

    addItem,

    removeItem,

    clearCart

  } = useCart();


  console.log(
    "CART ITEMS:",
    cartItems
  );


  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +

        (
          item.product.price *

          (item.quantity || 1)
        ),

      0
    );


  return (

    <div className="cart-page">

      <h2>
        Your Cart 🛒
      </h2>


      {cartItems.length === 0 ? (

        <p className="empty-text">
          Cart is empty
        </p>

      ) : (

        <>

          {cartItems.map((item) => (

            <div

              key={item.id}

              className="cart-item"

            >

              <img

                src={
                  item.product.image
                }

                alt={
                  item.product.name
                }

              />


              <div className="cart-info">

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


                <p>

                  Qty:

                  {
                    item.quantity || 1
                  }

                </p>

              </div>


              <div className="cart-actions">

                <button

                  onClick={() =>

                    addItem(
                      item.product
                    )

                  }

                >

                  +

                </button>


                <button

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

          ))}


          <div className="cart-summary">

            <h3>

              Total: ₹

              {
                totalPrice
              }

            </h3>


            <button

              className=
                "checkout-btn"

              onClick={() =>

                navigate(
                  "/checkout"
                )

              }

            >

              Proceed to Checkout

            </button>


            <button

              className=
                "clear-btn"

              onClick=
                {clearCart}

            >

              Clear Cart

            </button>

          </div>

        </>

      )}

    </div>
  );
}


export default CartPage;
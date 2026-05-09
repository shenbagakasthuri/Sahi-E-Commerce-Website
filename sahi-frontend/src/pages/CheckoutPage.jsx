import "../styles/CheckoutPage.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";

import { useOrders } from "../hooks/useOrders";

import { useToast } from "../context/ToastContext";

function CheckoutPage() {

  const navigate =
    useNavigate();

  const {
    cartItems,
    clearCart
  } = useCart();

  const {
    createOrder
  } = useOrders();

  const {
    showToast
  } = useToast();


  const [address,
    setAddress] =
      useState("");

  const [payment,
    setPayment] =
      useState("COD");


  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +

        (
          item.price *
          (item.quantity || 1)
        ),

      0
    );



  const handleOrder =
    async () => {

      if (!address.trim()) {

        showToast(
          "❌ Enter delivery address"
        );

        return;
      }


      const success =
        await createOrder();


      if (success) {

        await clearCart();

        showToast(
          "🎉 Order placed successfully"
        );

        navigate(
          "/orders"
        );
      }
    };



  if (
    cartItems.length === 0
  ) {

    return (

      <div className="checkout-empty">

        <h2>
          Your cart is empty 🛒
        </h2>

        <button
          onClick={() =>
            navigate("/")
          }
        >
          Continue Shopping
        </button>

      </div>
    );
  }



  return (

    <div className="checkout-page">


      <h1>
        Secure Checkout
      </h1>



      <div className="checkout-container">


        {/* LEFT */}
        <div className="checkout-left">

          <h3>
            Delivery Address
          </h3>

          <textarea

            placeholder=
              "Enter full address..."

            value=
              {address}

            onChange={(e) =>

              setAddress(
                e.target.value
              )
            }
          />


          <h3>
            Payment Method
          </h3>


          <div className="payment-options">

            <label>

              <input

                type="radio"

                checked={
                  payment ===
                  "COD"
                }

                onChange={() =>

                  setPayment(
                    "COD"
                  )
                }
              />

              Cash on Delivery

            </label>


            <label>

              <input

                type="radio"

                checked={
                  payment ===
                  "UPI"
                }

                onChange={() =>

                  setPayment(
                    "UPI"
                  )
                }
              />

              UPI

            </label>

          </div>

        </div>



        {/* RIGHT */}
        <div className="checkout-right">

          <h3>
            Order Summary
          </h3>


          {cartItems.map(
            (item) => (

              <div

                key={item.id}

                className=
                  "summary-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />


                <div>

                  <p>
                    {item.name}
                  </p>

                  <small>

                    Qty:

                    {" "}

                    {
                      item.quantity || 1
                    }

                  </small>

                </div>


                <strong>

                  ₹

                  {
                    item.price
                  }

                </strong>

              </div>
            )
          )}


          <div className="total-box">

            <h2>

              Total:

              {" "}

              ₹

              {
                totalPrice
              }

            </h2>

          </div>


          <button

            className=
              "place-order-btn"

            onClick={
              handleOrder
            }
          >

            Place Order

          </button>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;
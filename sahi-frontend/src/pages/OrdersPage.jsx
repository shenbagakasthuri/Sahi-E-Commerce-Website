import "../styles/OrdersPage.css";

import {
  FiPackage,
  FiCalendar,
  FiCheckCircle,
  FiShoppingBag
} from "react-icons/fi";

import { useOrders }
  from "../hooks/useOrders";


function OrdersPage() {

  const {
    orders = []
  } = useOrders();



  const formatDate =
    (date) => {

      if (!date)
        return "Recently";

      return new Date(
        date
      ).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      );
    };



  return (

    <div className="orders-page">


      {/* PAGE TITLE */}
      <h2>
        My Orders 📦
      </h2>



      {/* EMPTY STATE */}
      {orders.length === 0 ? (

        <div className="empty-orders">

          <FiPackage />

          <h3>
            No Orders Yet
          </h3>

          <p>
            Start shopping and your
            orders will appear here.
          </p>

        </div>

      ) : (


        orders.map(

          (order) => (

            <div

              key={order?.id}

              className=
                "order-card"
            >


              {/* TOP */}
              <div className="order-top">


                <div>

                  <h4>
                    Order #

                    {
                      order?.id
                    }
                  </h4>


                  <p className="order-date">

                    <FiCalendar />

                    {
                      formatDate(
                        order?.createdAt
                      )
                    }

                  </p>

                </div>



                <span
                  className=
                    "status-badge"
                >

                  <FiCheckCircle />

                  {

                    order?.status ||

                    "Processing"
                  }

                </span>


              </div>




              {/* PRODUCTS */}
              <div
                className=
                  "order-items"
              >

                {

                  order?.items?.length > 0

                    ? (

                      order.items.map(

                        (item) => (

                          <div

                            key={
                              item?.id
                            }

                            className=
                              "order-item"

                          >

                            <img

                              src={

                                item?.product?.image
                              }

                              alt={

                                item?.product?.name
                              }

                            />


                            <p>

                              {

                                item?.product?.name
                              }

                            </p>

                          </div>

                        )
                      )

                    ) : (

                      <p>
                        No product details
                      </p>

                    )
                }

              </div>





              {/* BOTTOM */}
              <div
                className=
                  "order-bottom"
              >


                <p>

                  <FiShoppingBag />

                  {

                    order?.items
                      ?.length || 0
                  }

                  {" "}Items

                </p>



                <h3>

                  ₹

                  {

                    order
                      ?.totalAmount
                      ?.toFixed(2)
                  }

                </h3>


              </div>


            </div>

          )
        )

      )}

    </div>

  );
}


export default OrdersPage;
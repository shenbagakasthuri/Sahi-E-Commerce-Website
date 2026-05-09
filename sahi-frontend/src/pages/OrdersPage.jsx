import "../styles/OrdersPage.css";

import { useOrders } from "../hooks/useOrders";

function OrdersPage() {

  const {
    orders
  } = useOrders();


  return (

    <div className="orders-page">

      <h2>
        My Orders 📦
      </h2>


      {orders.length === 0 ? (

        <p>
          No orders yet
        </p>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="order-card"
          >

            <h4>
              Order #{order.id}
            </h4>

            <p>
              ₹{order.totalAmount}
            </p>

            <p>
              {order.status}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default OrdersPage;
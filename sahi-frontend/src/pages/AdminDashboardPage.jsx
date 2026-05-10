import {

  FiBox,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiAlertTriangle

} from "react-icons/fi";


import {

  useEffect,
  useState

} from "react";


import {

  getAdminDashboard,
  getLowStockProducts

} from "../api/adminApi";


import "../styles/AdminDashboardPage.css";



export default function AdminDashboardPage() {


  const [stats,
    setStats] =
      useState(null);


  const [lowStock,
    setLowStock] =
      useState([]);


  const [loading,
    setLoading] =
      useState(true);




  useEffect(() => {


    async function fetchDashboard() {

      try {


        const dashboardData =

          await getAdminDashboard();



        const stockData =

          await getLowStockProducts();




        setStats(
          dashboardData
        );


        setLowStock(
          stockData
        );

      }

      catch (error) {

        console.error(
          error
        );
      }

      finally {

        setLoading(
          false
        );
      }
    }



    fetchDashboard();

  }, []);





  if (loading) {

    return <h2>Loading...</h2>;
  }





  return (


    <div className="admin-dashboard">


      <div className="dashboard-header">

        <h1>
          Admin Dashboard 👨‍💼
        </h1>

      </div>








      {/* REAL STATS */}

      <div className="stats-grid">



        <div className="stat-card">

          <FiUsers />

          <h3>

            {
              stats?.totalUsers
            }

          </h3>

          <p>
            Users
          </p>

        </div>






        <div className="stat-card">

          <FiBox />

          <h3>

            {
              stats?.totalProducts
            }

          </h3>

          <p>
            Products
          </p>

        </div>







        <div className="stat-card">

          <FiShoppingBag />

          <h3>

            {
              stats?.totalOrders
            }

          </h3>

          <p>
            Orders
          </p>

        </div>








        <div className="stat-card">

          <FiDollarSign />

          <h3>

            ₹

            {
              stats
                ?.totalRevenue
            }

          </h3>

          <p>
            Revenue
          </p>

        </div>


      </div>









      {/* LOW STOCK */}

      <div className="recent-section">

        <h2>

          <FiAlertTriangle />

          Low Stock Alerts

        </h2>



        {

          lowStock.length === 0

            ? (

              <p>
                All products healthy ✅
              </p>

            )

            : (

              lowStock.map(

                (product) => (

                  <div

                    key={
                      product?.id
                    }

                    className=
                      "activity-card"

                  >

                    <p>

                      {

                        product?.name
                      }

                    </p>


                    <strong>

                      Stock:

                      {" "}

                      {

                        product?.stock
                      }

                    </strong>

                  </div>

                )
              )

            )
        }


      </div>


    </div>
  );
}
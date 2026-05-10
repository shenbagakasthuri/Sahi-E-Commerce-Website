import {

  FiStar,
  FiShoppingCart,
  FiHeart,
  FiPackage

} from "react-icons/fi";


import {

  useParams

} from "react-router-dom";


import {

  useEffect,
  useState

} from "react";


import "../styles/ProductDetailsPage.css";


import {

  useCart

} from "../hooks/useCart";


import {

  getProductById

} from "../api/productApi";



function ProductDetailsPage() {


  const {
    id
  } = useParams();


  const {
    addItem
  } = useCart();



  const [product,
    setProduct] =
      useState(null);


  const [loading,
    setLoading] =
      useState(true);




  useEffect(() => {


    const fetchProduct =
      async () => {

        try {

          setLoading(true);


          const res =
            await getProductById(
              id
            );


          setProduct(
            res
          );

        }

        catch (err) {

          console.error(
            "Product fetch error:",
            err
          );

          setProduct(
            null
          );
        }

        finally {

          setLoading(
            false
          );
        }
      };


    fetchProduct();

  }, [id]);





  if (loading) {

    return (

      <div className="loading-page">

        <h2>
          Loading product...
        </h2>

      </div>
    );
  }




  if (!product) {

    return (

      <div className="error-page">

        <h2>
          Product not found 😢
        </h2>

      </div>
    );
  }





  return (


    <div className="product-details">



      {/* IMAGE */}

      <div className="image-section">


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

      <div className="info-section">



        <span
          className=
            "category-badge"
        >

          {
            product?.category
          }

        </span>





        <h1>

          {
            product?.name
          }

        </h1>





        <div
          className=
            "rating-box"
        >

          <FiStar />

          {

            product?.rating
            ||

            "4.5"
          }

        </div>






        <h2
          className=
            "price"
        >

          ₹

          {
            product?.price
          }

        </h2>






        <div
          className=
            "stock-box"
        >

          <FiPackage />

          In Stock

        </div>







        <p
          className=
            "description"
        >

          {

            product?.description
          }

        </p>








        <div
          className=
            "action-buttons"
        >


          <button

            className=
              "add-btn"

            onClick={() =>

              addItem(
                product
              )
            }
          >


            <FiShoppingCart />

            Add to Cart

          </button>





          <button
            className=
              "wishlist-btn"
          >

            <FiHeart />

          </button>


        </div>


      </div>


    </div>
  );
}



export default ProductDetailsPage;
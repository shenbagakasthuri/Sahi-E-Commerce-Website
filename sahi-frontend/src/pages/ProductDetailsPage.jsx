import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProductDetailsPage.css";
import { useCart } from "../hooks/useCart";
import { getProductById } from "../api/productApi";

function ProductDetailsPage() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await getProductById(id);

        setProduct(res);

      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details">

      <div className="image-section">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="info-section">
        <h1>{product.name}</h1>
        <h3>₹{product.price}</h3>
        <p>⭐ {product.rating}</p>
        <p>{product.description}</p>

        <button
          className="add-btn"
          onClick={() =>
            addItem(product)
          }
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetailsPage;
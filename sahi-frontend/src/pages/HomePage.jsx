import { useEffect, useState } from "react";

import "../styles/HomePage.css";

import ProductCard from "../components/ProductCard";

import { useSearch } from "../context/SearchContext";

import { getAllProducts } from "../api/productApi";

function HomePage() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory,
    setSelectedCategory] =
      useState("All");


  const {
    searchQuery,
    setSearchQuery
  } = useSearch();


  const categories = [

    "All",

    "Men",

    "Women",

    "Electronics",

    "Mobiles",

    "Beauty",

    "Sports"
  ];


  // FETCH PRODUCTS
  useEffect(() => {

    async function fetchProducts() {

      try {

        setLoading(true);

        const data =
          await getAllProducts();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(
          error
        );

        setProducts([]);

      } finally {

        setLoading(false);
      }
    }

    fetchProducts();

  }, []);



  // HERO BUTTON
  const scrollToProducts = () => {

    const section =
      document.getElementById(
        "products-section"
      );

    section?.scrollIntoView({

      behavior: "smooth"
    });
  };



  // FILTER
  const filteredProducts =
    products.filter((product) => {

      const matchesSearch =

        (product?.name || "")
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );


      const matchesCategory =

        selectedCategory === "All"

        ||

        product?.category ===
        selectedCategory;


      return (

        matchesSearch
        &&
        matchesCategory
      );
    });



  return (

    <main className="home">


      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            Big Deals on Latest Products
          </h1>

          <p>
            Shop smart, save more —
            only on SAHI
          </p>

          <button
            onClick={scrollToProducts}
          >
            Shop Now
          </button>

        </div>

      </section>



      {/* CATEGORIES */}
      <section className="categories">

        <h2>
          Shop by Categories
        </h2>


        <div className="category-grid">

          {categories.map(
            (category) => (

              <div

                key={category}

                className={

                  `category-card ${
                    selectedCategory === category
                      ? "active"
                      : ""
                  }`
                }

                onClick={() =>

                  setSelectedCategory(
                    category
                  )
                }
              >

                {category}

              </div>
            )
          )}

        </div>

      </section>



      {/* SEARCH */}
      <section className="search-section">

        <input

          type="text"

          placeholder=
            "Search products..."

          value=
            {searchQuery}

          onChange={(e) =>

            setSearchQuery(
              e.target.value
            )
          }
        />

      </section>



      {/* PRODUCTS */}
      <section

        id="products-section"

        className=
          "products-section"
      >

        <h2>
          🔥 Featured Products
        </h2>


        <div className="products-grid">

          {loading ? (

            <p>
              Loading products...
            </p>

          ) : filteredProducts.length > 0 ? (

            filteredProducts.map(

              (product) => (

                <ProductCard

                  key={product.id}

                  product={product}
                />
              )
            )

          ) : (

            <p>
              No products found 😢
            </p>
          )}

        </div>

      </section>



      {/* BANNER */}
      <section className="banner-section">

        <div className="banner">

          <h3>
            🔥 Mega Sale Up to 70% Off
          </h3>

          <p>
            Limited time offers
          </p>

        </div>


        <div className="banner secondary">

          <h3>
            📱 New Arrivals
          </h3>

          <p>
            Latest gadgets
          </p>

        </div>

      </section>

    </main>
  );
}

export default HomePage;
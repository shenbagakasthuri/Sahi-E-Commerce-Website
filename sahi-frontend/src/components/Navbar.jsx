import { useState } from "react";

import {
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";

import "../styles/Navbar.css";

import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";

import {

  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiLogOut

} from "react-icons/fi";


function Navbar() {

  const navigate =
    useNavigate();

  const [menuOpen,
    setMenuOpen] =
      useState(false);


  const {
    cartItems
  } = useCart();


  const {
    wishlist
  } = useWishlist();


  const {
    user,
    logout
  } = useAuth();


  const cartCount =
    cartItems?.length || 0;


  const wishlistCount =
    wishlist?.length || 0;


  const handleLogout =
    () => {

      logout();

      navigate("/");
    };


  const closeMenu =
    () => {

      setMenuOpen(
        false
      );
    };


  return (

    <nav className="navbar">


      {/* LOGO */}
      <Link
        to="/"
        className="logo"
      >
        SAHI
      </Link>



      {/* NAV LINKS */}
      <div
        className={

          `nav-links ${
            menuOpen
              ? "active"
              : ""
          }`
        }
      >

        <NavLink
          to="/"
          onClick={closeMenu}
        >
          Home
        </NavLink>


        {user && (

          <NavLink
            to="/orders"
            onClick={closeMenu}
          >
            Orders
          </NavLink>

        )}


        {user?.role ===
          "ADMIN" && (

          <NavLink
            to="/admin"
            onClick={closeMenu}
          >
            Admin
          </NavLink>

        )}


        {!user && (

          <>
            <NavLink
              to="/login"
              onClick={closeMenu}
            >
              Login
            </NavLink>


            <NavLink
              to="/register"
              onClick={closeMenu}
            >
              Register
            </NavLink>

          </>

        )}

      </div>



      {/* ICONS */}
      <div className="nav-icons">


        {/* WISHLIST */}
        {user && (

          <Link
            to="/wishlist"
            className="icon-wrapper"
          >

            <FiHeart />

            {wishlistCount > 0 && (

              <span className="badge">

                {wishlistCount}

              </span>

            )}

          </Link>

        )}



        {/* CART */}
        {user && (

          <Link
            to="/cart"
            className="icon-wrapper"
          >

            <FiShoppingCart />

            {cartCount > 0 && (

              <span className="badge">

                {cartCount}

              </span>

            )}

          </Link>

        )}



        {/* AUTH */}
        {!user ? (

          <Link to="/login">

            <FiUser />

          </Link>

        ) : (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <FiLogOut />

          </button>

        )}



        {/* MOBILE */}
        <button
          className="menu-icon"
          onClick={() =>

            setMenuOpen(
              !menuOpen
            )
          }
        >

          {menuOpen
            ? <FiX />
            : <FiMenu />
          }

        </button>


      </div>

    </nav>
  );
}


export default Navbar;
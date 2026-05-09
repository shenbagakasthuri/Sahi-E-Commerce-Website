import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { SearchProvider } from "./context/SearchContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import CartProvider from "./context/CartContext";

import WishlistProvider from "./context/WishlistContext";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <SearchProvider>

          <ToastProvider>

            <CartProvider>

              <WishlistProvider>

                  <App />

              </WishlistProvider>

            </CartProvider>

          </ToastProvider>

        </SearchProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);
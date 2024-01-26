import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/style.css";
import Home from "./Home";
import Products from "./Products";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartContextProvider } from "./CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/products/:productId", // Define a route with a dynamic parameter
    element: <ProductDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);

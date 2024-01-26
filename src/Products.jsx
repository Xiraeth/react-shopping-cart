import React, { useState, useEffect } from "react";
import Header from "./Header";
// import { useCartContext } from './CartContext';
import ProductPanel from "./ProductPanel";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [apiItems, setApiItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { cart, setCart } = useCartContext();
  const navigate = useNavigate();

  const navigateToProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        );

        const responsePromise = fetch("https://fakestoreapi.com/products/", {
          mode: "cors",
        });

        const response = await Promise.race([responsePromise, timeoutPromise]);

        if (!response.ok)
          throw new Error("Error fetching the data. Try again.");

        const initialData = await response.json();
        const electronics = initialData.filter(
          (item) => item.category === "electronics"
        );
        setApiItems(electronics);
        console.log(electronics);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      // Cleanup function to update isMounted when the component is unmounted
      setLoading(true);
      setError(null);
    };
  }, []);

  return (
    <div>
      <Header />
      {loading && (
        <i className="fa-solid fa-spinner fa-spin-pulse productsLoading"></i>
      )}
      {error && <h1 className="timeoutError">Error: {error}</h1>}
      <div className="productsContainer">
        {apiItems.map((item) => {
          return (
            <ProductPanel
              key={item.id}
              price={item.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              title={item.title}
              image={item.image}
              id={item.id}
              onClick={() => navigateToProductDetails(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

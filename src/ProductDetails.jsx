// ProductDetails.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useCartContext } from "./CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
  const { cart, setCart } = useCartContext();
  const [productDetails, setProductDetails] = useState(null);
  const [itemAmount, setItemAmount] = useState(1);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const addToCart = () => {
    const existingCartItemIndex = cart.findIndex(
      (item) => item.id === productDetails.id
    );

    if (existingCartItemIndex !== -1) {
      // if item already exists in the cart
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].amount += itemAmount;
      setCart(updatedCart);
    } else {
      // if item doesn't exist in the cart, add a new object
      setCart([...cart, { ...productDetails, amount: itemAmount }]);
    }

    setShowSuccessMessage(true);

    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);

    setItemAmount(1);

    console.log(cart);
  };

  const incrementItemAmount = () => {
    setItemAmount((itemAmount) => itemAmount + 1);
  };

  const decrementItemAmount = () => {
    setItemAmount((itemAmount) => {
      if (itemAmount === 1) return itemAmount;
      else return itemAmount - 1;
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log(productId);
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        console.log(response);

        if (!response.ok) {
          console.error(
            `Error fetching product details: ${response.statusText}`
          );
          return;
        }

        // Check if the response is empty
        const text = await response.text();
        if (!text) {
          throw new Error("Empty response");
        }

        const product = JSON.parse(text);
        setProductDetails(product);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    return (
      <div>
        <Header />
        <i className="fa-solid fa-spinner fa-spin-pulse productsLoading"></i>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="productDetailView">
        <div className="pdLeftSide">
          <img src={productDetails.image} alt={productDetails.title} />
        </div>
        <div className="pdRightSide">
          <div>
            <h2>{productDetails.title}</h2>
            <h3>
              {productDetails.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span>&#8364;</span>
            </h3>
          </div>
          <div className="productDetailsDescription">
            {productDetails.description}
          </div>
          <div>
            <i
              className="fa-solid fa-star"
              style={{ color: "#FFD43B", marginRight: "5px" }}
            ></i>
            {productDetails.rating.rate}/5{" "}
            <span className="ratingCounter">
              ({productDetails.rating.count})
            </span>
          </div>
          <div className="buttonation">
            <div className="shopButtons">
              <button onClick={decrementItemAmount}>-</button>
              {itemAmount > 0 ? <span>{itemAmount}</span> : "0"}
              <button onClick={incrementItemAmount}>+</button>
            </div>
            <div>
              <button onClick={addToCart} className="addToCartBtn">
                Add to cart
              </button>
              <p
                className={`successfulAddMsg ${
                  showSuccessMessage ? "active" : ""
                }`}
              >
                {itemAmount > 1 ? "Items" : "Item"} added to cart!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

// ProductPanel.jsx
import React from "react";
import { Link } from "react-router-dom";

// TODO: ADD PRICE <p>
function ProductPanel({ id, title, image, price, onClick }) {
  return (
    <Link to={`/products/${id}`} className="linkToProduct">
      <div className="productPanel" onClick={onClick}>
        <img src={image} alt={title} />
        <h1>
          {price}
          <span>&#8364;</span>
        </h1>
        <p title={title}>{title}</p>
      </div>
    </Link>
  );
}

export default ProductPanel;

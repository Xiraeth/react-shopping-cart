import React from "react";
import { NavLink } from "react-router-dom";
import { useCartContext } from "./CartContext.jsx";

function Header() {
  const { cart } = useCartContext();

  return (
    <nav className="headerNav">
      <div className="logo">Logo</div>
      <div className="links">
        <NavLink to="/">
          <i className="fa-solid fa-house"></i>
        </NavLink>
        <NavLink to="/products">
          <i className="fa-solid fa-store"></i>
        </NavLink>
        <NavLink to="/cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {cart.length > 0 && <div className="cartSize">{cart.length}</div>}
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;

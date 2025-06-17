import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to target section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle section link clicks
  const handleMenuClick = (id, menuName) => {
    setMenu(menuName);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(id);
      }, 100); // Delay to allow route change
    } else {
      scrollToSection(id);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick("explore-menu", "menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick("app-download", "mobile-app");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleMenuClick("footer", "contact-us");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;

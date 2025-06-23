import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    toast.success("✅ Your order has been placed!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <>
      <ToastContainer />
      <button className="GoBack" onClick={() => navigate("/cart")}>
        ⬅️ Go Back to Cart Page
      </button>

      <form className="place-order" onSubmit={handlePlaceOrder}>
        <div className="place-order-left">
          <h2 className="title">Delivery Information</h2>
          <div className="multi-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Street" required />
          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>
          <div className="multi-fields">
            <input type="number" placeholder="Zip Code" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="number" placeholder="Phone" required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  $
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryFee}
                </b>
              </div>
            </div>

            <div className="cod-checkbox">
              <input
                type="checkbox"
                id="cod"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="cod">
                Cash on delivery. Your money will be collected upon delivery.
              </label>
            </div>

            <button
              type="submit"
              disabled={!isChecked || getTotalCartAmount() === 0}
            >
              PROCEED TO Payment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;

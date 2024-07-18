import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, setCartItems, url, token, food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 50), // Added delivery charge logic
    };

    //try {
      
      
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        } else {
          alert("Data added Successfully")//toast.error("Something Went Wrong");
        }
      /* else {
        response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
        if (response.data.success) {
          navigate("/myorders");
          toast.success(response.data.message);
          setCartItems({});
        } else {
          toast.error("Something Went Wrong");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing the order");
    }*/
  }

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p>Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
        <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery-fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

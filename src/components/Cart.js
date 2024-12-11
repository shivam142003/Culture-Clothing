import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import "../css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate=useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = localStorage.getItem("auth_token") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn]);

  const fetchCartData = async () => {
    const authToken = localStorage.getItem("auth_token");
    try {
      const response = await axios.get('https://culture-clothing.onrender.com/api/cart', {
        headers: { 'auth-token': authToken },
      });

      const backendCart = response.data.items || [];
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Merge backend and local storage cart
      const combinedCart = [...savedCart];

      backendCart.forEach(backendItem => {
        const existsInLocal = savedCart.some(
          localItem => localItem.productId === backendItem.productId && localItem.size === backendItem.size
        );
        if (!existsInLocal) {
          combinedCart.push(backendItem);
        }
      });

      // Only update the state and localStorage if the cart is different
      if (JSON.stringify(combinedCart) !== JSON.stringify(savedCart)) {
        setCart(combinedCart);
        localStorage.setItem("cart", JSON.stringify(combinedCart));
      }
    } catch (error) {
      // console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (newItem) => {
    const existingIndex = cart.findIndex(
      (item) => item.productId === newItem.productId && item.size === newItem.size
    );

    let updatedCart;
    if (existingIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += newItem.quantity;
    } else {
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = async (index) => {
    const itemToRemove = cart[index];
    const authToken = localStorage.getItem("auth_token");

    try {
      // Remove from backend
      if (isLoggedIn) {
        await axios.delete(`https://culture-clothing.onrender.com/api/cart/${itemToRemove.productId}/${itemToRemove.size}`, {
          headers: { 'auth-token': authToken },
        });
      }

      // Remove from frontend cart and local storage
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data.message === "Cart item not found") {
        // If item is not in the backend, remove it only from local storage and state
        console.warn("Cart item not found in backend, removing locally...");
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
      else
      console.error("Error removing item from cart:", error);
    }
  };

  const increaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const decreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const shippingCost = 50;
  // const totalPrice = cart
  //   .reduce((total, item) => total +  parseFloat(item.price.replace(/[^0-9.-]+/g, "")), 0)
  //   .toFixed(2);
  // const totalWithShipping = (parseFloat(totalPrice) + shippingCost).toFixed(2);
  const totalPrice = cart
  .reduce(
    (total, item) =>
      total +
      parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
    0
  )
  .toFixed(2);

const totalWithShipping = (parseFloat(totalPrice) + shippingCost).toFixed(2);


  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    navigate("/checkout");
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  return (
    <section className="h-100 h-custom cart-font">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 cart-container">
            <div className="card card-registration card-registration-2 cart-body">
              <div className="card-body p-0">
                <div className="row g-0 cart-body">
                  <div className="col-lg-8">
                    <div className="px-5">
                      <h1 className="cart-title">
                        Shopping Cart
                        <hr />
                      </h1>
                      {cart.length === 0 ? (
                        <p className="empty-cart-message">
                          <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty cart" className="empty-cart-icon" />
                          Your cart is empty. <Link to="/">Continue Shopping</Link>
                        </p>
                      ) : (
                        cart.map((item, index) => (
                          <div className="row cart-item mb-4 d-flex justify-content-between align-items-center" key={index}>
                            {/* <div className="col-md-2 col-lg-2 col-xl-2">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} className="img-fluid rounded-3" alt={item.title} />
                              ) : (
                                <img src="https://via.placeholder.com/150" className="img-fluid rounded-3" alt="Default" />
                              )}
                            </div> */}
                            <div className="row w-100 mb-3">
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <div className="text-muted item-title font-weight-bold" style={{ color: 'black' }}>Product</div>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <div className="text-muted item-title font-weight-bold" style={{ color: 'black' }}>Size</div>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <div className="text-muted item-title font-weight-bold" style={{ color: 'black' }}>Quantity</div>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <div className="text-muted item-title font-weight-bold" style={{ color: 'black' }}>Price</div>
                              </div>
                              {/* <div className="col-md-1 col-lg-1 col-xl-1 text-end">
      <div className="text-muted item-title font-weight-bold" style={{ color: 'black' }}>Remove</div>
    </div> */}
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <div className="text-muted item-title">{item.category}</div>
                              <div className="mb-0 item-title">{item.title}</div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <div className="mb-0 item-title">{item.size}/-</div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <div className="mb-0 item-title">
                                {/* Quantity Controls */}
                                <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(index)}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(index)}>+</button>
                              </div>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <div className="mb-0 item-title">{item.price}/-</div>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button className="text-muted" onClick={() => removeFromCart(index)}>
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                            <hr className="my-2 line" />
                          </div>
                        ))
                      )}
                      <Link to="/" className="text-body"><i className="fas fa-long-arrow-alt-left me-2"> Back to shop</i></Link>
                    </div>
                  </div>
                  <div className="col-lg-4 cart-summary">
                    <div className="px-5">
                      <h3 className="summary-title fw-bold mb-2 mt-2 pt-1">Summary</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4 w-100">
                        <h5 className="text-uppercase">Items {cart.length}</h5>
                        <h5>Rs {totalPrice}</h5>
                      </div>
                      <h5 className="text-uppercase mb-3">Shipping</h5>
                      <div className="mb-4 pb-2">
                        <select className="form-select item-title optiom-value">
                          <option value="1">Standard-Delivery - Rs 50.00</option>
                        </select>
                      </div>
                      <hr className="mb-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">Total</h5>
                        <h5>Rs {totalWithShipping}</h5>
                      </div>
                      <button className="btn checkout-button" onClick={handleCheckout}>
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
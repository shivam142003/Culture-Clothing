// // export default Checkout;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/Checkout.css";
// import { useNavigate } from "react-router-dom";

// const Checkout = () => {
//   const [billingInfo, setBillingInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     address2: "",
//     city: "",
//     postalCode: "",
//     state: "",
//     country: "India", // Default to India
//   });

//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     upiId: "",
//   });

//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState("COD"); // Set default payment method to COD
//   const [height, setHeight] = useState([]);
//   const shippingCost = 50;
//   const navigate = useNavigate();
//   const [totalQuantity, setTotalQuantity] = useState(0);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);

//     const total = storedCart.reduce((sum, item) => sum + item.quantity, 0);
//     setTotalQuantity(total);
//   }, []);

//   const cartTotal = cartItems.reduce(
//     (total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
//     0
//   );
//   const totalWithShipping = cartTotal + shippingCost;

//   const handleInputChange = (event, setState) => {
//     const { name, value } = event.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleExpiryDateChange = (event) => {
//     let { value } = event.target;
//     value = value.replace(/[^0-9]/g, "");
//     if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
//     if (value.length > 5) value = value.slice(0, 5);
//     setPaymentInfo((prev) => ({ ...prev, expiryDate: value }));
//   };

//   const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
//   const isValidPhone = (phone) => /^\d{10}$/.test(phone);
//   const isValidPostalCode = (code) => /^\d{6}$/.test(code);

//   const validateBillingInfo = () => {
//     const { name, email, phone, address, city, postalCode } = billingInfo;
//     if (!name || !email || !phone || !address || !city || !postalCode) {
//       alert("Please fill in all the fields.");
//       return false;
//     }
//     if (!isValidEmail(email)) {
//       alert("Please enter a valid email.");
//       return false;
//     }
//     if (!isValidPhone(phone)) {
//       alert("Please enter a valid phone number.");
//       return false;
//     }
//     if (!isValidPostalCode(postalCode)) {
//       alert("Please enter a valid postal code.");
//       return false;
//     }
//     return true;
//   };

//   const generateOrderId = () => {
//     const timestamp = new Date().getTime(); // Get current timestamp
//     const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
//     return `ORD${timestamp}${randomNum}`; // Combine both for a unique ID
//   };


//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateBillingInfo()) return;

//     try {
//       const orderData = {
//         order_id: generateOrderId(), // You can generate a dynamic order ID if needed
//         order_date: new Date().toISOString(), // Current date
//         pickup_location: "Home-1",
//         comment: "Reseller: M/s Goku", // Static for this case, but can be dynamic
//         billing_customer_name: billingInfo.name,
//         billing_last_name: "", // You can modify this if you collect last name
//         billing_address: billingInfo.address,
//         billing_address_2: billingInfo.address2,
//         billing_city: billingInfo.city,
//         billing_pincode: billingInfo.postalCode,
//         billing_state: billingInfo.state,
//         billing_country: billingInfo.country,
//         billing_email: billingInfo.email,
//         billing_phone: billingInfo.phone,
//         shipping_is_billing: true, // Assuming shipping address is same as billing
//         order_items: cartItems.map((item) => ({
//           name: item.title,
//           sku: item.productId,
//           units: item.quantity,
//           selling_price: item.price.replace(/[^0-9.-]+/g, ""),
//           discount: "", // Add discount logic if applicable
//           tax: "", // Add tax calculation if needed
//           hsn: 441122, // Static HSN code, can be dynamic
//         })),
//         payment_method: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod,
//         shipping_charges: shippingCost,
//         giftwrap_charges: 0,
//         transaction_charges: 0,
//         total_discount: 0,
//         sub_total: cartTotal,
//         length: 10, // Set actual dimensions if needed
//         breadth: 15,
//         height: 20 + totalQuantity,
//         weight: 0.24 * totalQuantity, // Set actual weight if needed
//       };

//       const response = await axios.post("https://culture-clothing.onrender.com/api/shiprocket-order", orderData);

//       if (response.status === 200) {
//         alert("Order placed successfully!");
//         navigate("/order-success", { state: { orderDetails: response.data } });
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert(
//         error.response
//           ? `Order failed: ${error.response.data.message}`
//           : "Network error. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <h2>CHECKOUT</h2>

//       <div className="accordion" id="deliveryOrderAccordion">
//         <div className="row">


//           <div className="col-md-6">
//             <div className="accordion-item">
//               <h2 className="accordion-header text-start" id="flush-headingAddress">
//                 <div className="accordion-header-text fw-bold heading-checkout">
//                   Delivery Address
//                 </div>
//                 <hr className="hr-checkout" />
//               </h2>
//               <div
//                 id="flush-collapseAddress"
//                 className="accordion-collapse show"
//                 aria-labelledby="flush-headingAddress"
//               >
//                 <div className="accordion-body">
//                   <form className="checkout-fields">
//                     {["name", "email", "phone", "address", "address2", "city", "postalCode", "state"].map((field, idx) => (
//                       <input
//                         key={idx}
//                         type={field === "email" ? "email" : "text"}
//                         name={field}
//                         placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("Code", " Code")}
//                         value={billingInfo[field]}
//                         onChange={(e) => handleInputChange(e, setBillingInfo)}
//                         required
//                         className="form-control mb-3"
//                       />
//                     ))}
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="accordion-item">
//               <h2 className="accordion-header text-start" id="flush-headingSummary">
//                 <div className="accordion-header-text fw-bold heading-checkout">Order Summary
//                 </div>
//                 <hr className="hr-checkout" />


//               </h2>
//               <div
//                 id="flush-collapseSummary"
//                 className="accordion-collapse show"
//                 aria-labelledby="flush-headingSummary"
//               >
//                 <div className="accordion-body">
//                   <p>Items Total: ₹{cartTotal}</p>
//                   <p>Shipping: ₹{shippingCost}</p>
//                   <h4>Total: ₹{totalWithShipping}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="accordion accordion-flush" id="paymentAccordion" style={{ marginTop: "8px" }}>



//         <div className="accordion-item">
//           <h2 className="accordion-header" id="flush-headingCOD">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#flush-collapseCOD"
//               aria-expanded="false"
//               aria-controls="flush-collapseCOD"
//             >
//               Cash on Delivery (COD)
//             </button>
//           </h2>
//           <div
//             id="flush-collapseCOD"
//             className="accordion-collapse collapse"
//             aria-labelledby="flush-headingCOD"
//             data-bs-parent="#paymentAccordion"
//           >
//             <div className="accordion-body">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="COD"
//                 checked={paymentMethod === "COD"}
//                 onChange={() => setPaymentMethod("COD")}
//                 className="form-check-input"
//               />
//               <label className="form-check-label">Cash on Delivery</label>
//             </div>
//           </div>
//         </div>

//         <div className="accordion-item">
//           <h2 className="accordion-header" id="flush-headingUPI">
//             <button
//               className="accordion-button collapsed"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#flush-collapseUPI"
//               aria-expanded="false"
//               aria-controls="flush-collapseUPI"
//             >
//               UPI Payment
//             </button>
//           </h2>
//           <div
//             id="flush-collapseUPI"
//             className="accordion-collapse collapse"
//             aria-labelledby="flush-headingUPI"
//             data-bs-parent="#paymentAccordion"
//           >
//             <div className="accordion-body">
//               <input
//                 type="radio"
//                 name="paymentMethod"
//                 value="UPI"
//                 checked={paymentMethod === "UPI"}
//                 onChange={() => setPaymentMethod("UPI")}
//                 className="form-check-input"
//               />
//               <label className="form-check-label">UPI Payment</label>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="d-flex justify-content-center w-100 mt-4">
//         <button className="btn btn-primary w-100" onClick={handleCheckoutSubmit}>
//           Place Order
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Checkout;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Checkout.css";
import { useNavigate } from "react-router-dom";



const Checkout = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    postalCode: "",
    state: "",
    country: "India", // Default to India
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Set default payment method to COD
  const [totalQuantity, setTotalQuantity] = useState(0);
  const shippingCost = 50;
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    const total = storedCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, []);

  const cartTotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
    0
  );
  const totalWithShipping = cartTotal + shippingCost;

  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpiryDateChange = (event) => {
    let { value } = event.target;
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5);
    setPaymentInfo((prev) => ({ ...prev, expiryDate: value }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidPostalCode = (code) => /^\d{6}$/.test(code);

  const validateBillingInfo = () => {
    const { name, email, phone, address, city, postalCode } = billingInfo;
    if (!name || !email || !phone || !address || !city || !postalCode) {
      alert("Please fill in all the fields.");
      return false;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return false;
    }
    if (!isValidPhone(phone)) {
      alert("Please enter a valid phone number.");
      return false;
    }
    if (!isValidPostalCode(postalCode)) {
      alert("Please enter a valid postal code.");
      return false;
    }
    return true;
  };

  const generateOrderId = () => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
    return `ORD${timestamp}${randomNum}`; // Combine both for a unique ID
  };
  const handleRazorpayPayment = async () => {
    try {
      const orderData = {
        totalAmount: totalWithShipping, // This is the total amount for the order
        currency: "INR",
        receipt: generateOrderId(),  // Assuming this generates a unique order ID
      };
  
      // Call backend to create Razorpay order
      const response = await axios.post("https://culture-clothing.onrender.com/api/create-order", orderData);
  
      if (response.status === 200) {
        const { order_id, amount, currency } = response.data; // Destructure the response
  
        const options = {
          key: process.env.RAZORPAY_KEY_ID, // Add your Razorpay Key ID here
          amount: amount, // Amount in paise
          currency: currency, // Currency code (INR)
          order_id: order_id, // Razorpay order ID
          name: "Your Store Name",
          description: "Order Payment",
          image: "YOUR_STORE_LOGO_URL", // Optional
          handler: async function (response) {
            alert("Payment successful!");
  
            // Now call Shiprocket order API
            const shiprocketOrderData = {
            order_id: generateOrderId(), // You can generate a dynamic order ID if needed
            order_date: new Date().toISOString(), // Current date
            pickup_location: "Home-1",
            comment: "Reseller: M/s Goku", // Static for this case, but can be dynamic
            billing_customer_name: billingInfo.name,
            billing_last_name: "", // You can modify this if you collect last name
            billing_address: billingInfo.address,
            billing_address_2: billingInfo.address2,
            billing_city: billingInfo.city,
            billing_pincode: billingInfo.postalCode,
            billing_state: billingInfo.state,
            billing_country: billingInfo.country,
            billing_email: billingInfo.email,
            billing_phone: billingInfo.phone,
            shipping_is_billing: true, // Assuming shipping address is same as billing
            order_items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              units: item.quantity,
              selling_price: item.price.replace(/[^0-9.-]+/g, ""),
              discount: "", // Add discount logic if applicable
              tax: "", // Add tax calculation if needed
              hsn: 441122, // Static HSN code, can be dynamic
            })),
            payment_method:"prepaid",
            shipping_charges: shippingCost,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            sub_total: cartTotal,
            length: 10, // Set actual dimensions if needed
            breadth: 15,
            height: 20 + totalQuantity,
            weight: 0.24 * totalQuantity, // Set actual weight if needed
            };
  
            try {
              const shiprocketResponse = await axios.post(
                "https://culture-clothing.onrender.com/api/shiprocket-order",
                shiprocketOrderData
              );
              if (shiprocketResponse.status === 200) {
                navigate("/orderSuccess", { state: { orderDetails: shiprocketResponse.data } });
              }
            } catch (shiprocketError) {
              console.error("Error placing order in Shiprocket:", shiprocketError);
              alert("Order placement failed after payment. Please contact support.");
            }
          },
          prefill: {
            name: billingInfo.name,
            email: billingInfo.email,
            contact: billingInfo.phone,
          },
          theme: {
            color: "#F37254",
          },
        };
  
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      }
    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      alert("Payment failed. Please try again.");
    }
  };
  
  const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateBillingInfo()) return;
    
        try {
          const orderData = {
            order_id: generateOrderId(), // You can generate a dynamic order ID if needed
            order_date: new Date().toISOString(), // Current date
            pickup_location: "Home-1",
            comment: "Reseller: M/s Goku", // Static for this case, but can be dynamic
            billing_customer_name: billingInfo.name,
            billing_last_name: "", // You can modify this if you collect last name
            billing_address: billingInfo.address,
            billing_address_2: billingInfo.address2,
            billing_city: billingInfo.city,
            billing_pincode: billingInfo.postalCode,
            billing_state: billingInfo.state,
            billing_country: billingInfo.country,
            billing_email: billingInfo.email,
            billing_phone: billingInfo.phone,
            shipping_is_billing: true, // Assuming shipping address is same as billing
            order_items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              units: item.quantity,
              selling_price: item.price.replace(/[^0-9.-]+/g, ""),
              discount: "", // Add discount logic if applicable
              tax: "", // Add tax calculation if needed
              hsn: 441122, // Static HSN code, can be dynamic
            })),
            payment_method: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod,
            shipping_charges: shippingCost,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            sub_total: cartTotal,
            length: 10, // Set actual dimensions if needed
            breadth: 15,
            height: 20 + totalQuantity,
            weight: 0.24 * totalQuantity, // Set actual weight if needed
          };
          if (paymentMethod === "COD") {
            try {
              const response = await axios.post("https://culture-clothing.onrender.com/api/shiprocket-order", orderData);
              if (response.status === 200) {
                alert("Order placed successfully!");
                navigate("/OrderSuccess", { state: { orderDetails: response.data } });
              }
            } catch (error) {
              console.error("Error placing order:", error);
              alert("Order failed. Please try again.");
            }
          } else {
            handleRazorpayPayment(); // Trigger Razorpay payment
          }
          
        } catch (error) {
          console.error("Error placing order:", error);
          alert(
            error.response
              ? `Order failed: ${error.response.data.message}`
              : "Network error. Please try again."
          );
        }
      };

  return (
    <div className="checkout-container">
      <h2>CHECKOUT</h2>
      {/* Delivery Address Section */}
      <div className="accordion" id="deliveryOrderAccordion">
        <div className="row">
          <div className="col-md-6">
            <div className="accordion-item">
              <h2 className="accordion-header text-start" id="flush-headingAddress">
                <div className="accordion-header-text fw-bold heading-checkout">Delivery Address</div>
                <hr className="hr-checkout" />
              </h2>
              <div id="flush-collapseAddress" className="accordion-collapse show" aria-labelledby="flush-headingAddress">
                <div className="accordion-body">
                  <form className="checkout-fields">
                    {["name", "email", "phone", "address", "address2", "city", "postalCode", "state"].map((field, idx) => (
                      <input
                        key={idx}
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("Code", " Code")}
                        value={billingInfo[field]}
                        onChange={(e) => handleInputChange(e, setBillingInfo)}
                        required
                        className="form-control mb-3"
                      />
                    ))}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="col-md-6">
            <div className="accordion-item">
              <h2 className="accordion-header text-start" id="flush-headingSummary">
                <div className="accordion-header-text fw-bold heading-checkout">Order Summary</div>
                <hr className="hr-checkout" />
              </h2>
              <div id="flush-collapseSummary" className="accordion-collapse show" aria-labelledby="flush-headingSummary">
                <div className="accordion-body">
                  <p>Items Total: ₹{cartTotal}</p>
                  <p>Shipping: ₹{shippingCost}</p>
                  <h4>Total: ₹{totalWithShipping}</h4>
                  <div className="payment-methods">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="codRadio"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                      />
                      <label className="form-check-label" htmlFor="codRadio">Cash on Delivery</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="razorpayRadio"
                        value="Razorpay"
                        onChange={() => setPaymentMethod("Razorpay")}
                      />
                      <label className="form-check-label" htmlFor="razorpayRadio">Pay with Razorpay</label>
                    </div>
                  </div>
                  <button onClick={handleCheckoutSubmit} className="btn btn-success btn-lg btn-block checkout-btn">Proceed to Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

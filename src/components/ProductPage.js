import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Productpage.css";


const ProductPage = () => {
  const [isCareVisible, setCareVisible] = useState(false);
  const [isCompositionVisible, setCompositionVisible] = useState(false);
  const [isShippingVisible, setShippingVisible] = useState(false);
  const imageContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [size, setsize] = useState("");
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { productId } = useParams(); // Retrieve productId from URL
  // console.log("Product Page id: ", productId);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const toggleCare = () => setCareVisible(!isCareVisible);
  const toggleComposition = () => setCompositionVisible(!isCompositionVisible);
  const toggleShipping = () => setShippingVisible(!isShippingVisible);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    imageContainerRef.current.setAttribute("data-touch-start", e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const touchStartX = parseFloat(imageContainerRef.current.getAttribute("data-touch-start"));
    const distance = touchStartX - e.clientX;
    imageContainerRef.current.scrollLeft += distance;
    imageContainerRef.current.setAttribute("data-touch-start", e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // const handleAddToCart = () => {
  //   if (size) {
  //     const itemToAdd = { ...product, size };
  //     setCart((prevCart) => [...prevCart, itemToAdd]);
  //     alert(`${product.title} has been added to your cart!`);
  //   } else {
  //     alert("Please select a size before adding to cart.");
  //   }
  // };

  const handleAddToCart = () => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (size) {
      const isProductInCart = cart.some( // Check if product with the selected size already exists in the cart
        (item) => item.id === product.id && item.size === size
      );

      if (isProductInCart) { // If product is already in cart, increase the quantity
        setCart((prevCart) => {
          return prevCart.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 } // Increase quantity of existing item
              : item
          );
        });
        alert(`${product.title} in size ${size} quantity has been increased.`);
      } else {
        // If product is not in the cart, add it with quantity 1
        const itemToAdd = {
          ...product,
          size,
          userId: storedUser.id,
          quantity: 1 // Initialize with quantity 1
        };
        setCart((prevCart) => [...prevCart, itemToAdd]);
        alert(`${product.title} has been added to your cart!`);
      }
    } else {
      alert("Please select a size before adding to cart.");
    }
  };

  return (
    <div className="container my-4">
      <div className="product-card">
        <div className="row">
          {/* Product Description Section */}
          <div className="col-lg-3 col-12 order-lg-1 order-3 mb-3">
            <div className="product-details">
              <h2 className="title">{product.title}</h2>
              <h3>Description</h3>
              <p className="small-description">{product.description}</p>
              <h5 onClick={toggleCare} style={{ cursor: "pointer", color: "#ffff" }}>
                <i className="fas fa-heart" style={{ color: "rgb(211, 211, 211)" }}>
                  <span style={{ marginLeft: "5px", fontFamily: "Arial, sans-serif" }}>CARE</span>
                </i>




              </h5>
              {isCareVisible && (
                <div>
                  <ul>
                    {product.care.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <h5 onClick={toggleComposition} style={{ cursor: "pointer", color: "#ffff" }}>
                <i className="fas fa-atom" style={{ color: "rgb(211, 211, 211)" }}>
                  <span style={{ fontFamily: "Arial, sans-serif", marginLeft: "5px" }}>COMPOSITION</span>
                </i>


              </h5>
              {isCompositionVisible && (
                <div>
                  <ul>
                    {product.composition.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <h5 onClick={toggleShipping} style={{ cursor: "pointer", color: "#ffff" }}>
                <i className="fas fa-truck" style={{ color: "rgb(211, 211, 211)" }}>
                  <span style={{ fontFamily: "Arial, sans-serif", marginLeft: "5px" }}>SHIPPING & DELIVERY</span>
                </i>


              </h5>
              {isShippingVisible && (
                <div>
                  <ul>
                    {product.shipping.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Product Image Section */}
          <div className="col-lg-6 col-12 order-lg-2 order-1 mb-3 d-flex justify-content-center">
            <div
              className="image-container"
              ref={imageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* {product.images.map((image, index) => (
                <img key={index} src={product.image} className="img-fluid mb-2" alt={product.title} />
              ))} */}
              {product.images && product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${image}`}
                  className="img-fluid mb-2"
                  alt={product.title}
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="col-lg-3 col-12 order-lg-3 order-2">
            <div className="action-buttons mt-3">
              <div className="size-selection mb-3">
                <span className="selectsize">Select Size:</span>
                <div className="size-buttons d-flex flex-wrap">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={`btn ${size === size ? "btn-primary" : "btn-outline-secondary"} size-button mx-1`}
                      onClick={() => setsize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="buttons d-flex justify-content-between">
                <button className="btn btn-dark flex-fill me-2" onClick={handleAddToCart}>Add to Cart</button>
                <Link to="/cart" className="btn btn-primary flex-fill">Go to Cart</Link>
              </div>
              <button className="btn btn-primary price mt-3">{product.price}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


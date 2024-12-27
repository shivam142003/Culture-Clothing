import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../css/shopbyanime.css';

export default function Shopbyanime() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://culture-clothing.onrender.com/api/products");

        // Map product data and add full URL for the first image
        const updatedProducts = response.data.map((product) => ({
          ...product,
          image: product.images && product.images.length > 0
            ? `https://culture-clothing.onrender.com${product.images[0]}`
            : "https://culture-clothing.onrender.com/images/fallback.jpg", // Fallback image
        }));

        setProducts(updatedProducts);
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <br />
      <section className="my-1">
        <div className="container">
          <h2 className="text-center" style={{ color: "white" }}>Shop by Drops</h2>
          <br />
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="col-md-4 mb-4" key={product.productId}>
                  <div className="card anime-card">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.title}
                      style={{ objectFit: "contain", width: "100%", height: "200px" }}
                    />
                    <Link
                      to={`/product/${product.productId}`}
                      className="btn btn-primary title-with-arrow"
                    >
                      {product.title}
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center" style={{ color: "white" }}>products Loading...</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Trendingproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/trending ");

        // Map product data and add full URL for the first image
        const updatedProducts = response.data.map((product) => ({
          ...product,
          image: product.images && product.images.length > 0
            ? `http://localhost:5000${product.images[1]}`
            : "http://localhost:5000/images/fallback.jpg",  // Fallback image
        }));

        // console.log("Fetched products:", updatedProducts); // Debug log
        setProducts(updatedProducts);
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures it only runs once when component mounts

  return (
    <section className="py">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bootstrap-tabs product-tabs">
              <div className="tabs-header d-flex justify-content-between border-bottom">
                <h3>Trending Products</h3>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      href="/"
                      className="nav-link text-uppercase fs-6 active"
                      id="nav-all-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-all"
                    >
                      Trending
                    </a>
                    <a
                      href="/"
                      className="nav-link text-uppercase fs-6"
                      id="nav-drops-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-drops"
                    >
                      Drops
                    </a>
                    {/* <Link
                      to="/allproducts"
                      className="nav-link text-uppercase fs-6"
                      id="nav-others-tab"
                    >
                      All
                    </Link> */}


                  </div>
                </nav>
              </div>

              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-all"
                  role="tabpanel"
                  aria-labelledby="nav-all-tab"
                >
                  <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div className="col" key={product.productId}>

                          <div className="product-item text-center" style={{ background: 'none', border: 'none', margin: '0px' }}>
                            <figure className="m-0 p-0">
                              <Link
                                to={`/product/${product.productId}`}
                                title={product.title}
                              >
                                <img
                                  src={product.image}
                                  className="tab-image img-fluid"
                                  loading="lazy"
                                  alt={product.title}
                                  style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                                />
                                <span class="position-absolute top-10 translate-middle badge rounded-pill bg-danger">{product.discount > 0 ? `- ${product.discount}%` : ''}</span>
                              </Link>


                            </figure>
                            <div className="d-flex flex-column align-items-start mt-1">
                              <div className="d-flex justify-content-between align-items-center w-100">
                                <p
                                  className="mb-0 me-2"
                                  style={{
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                  }}
                                >
                                  {product.title}
                                </p>
                                <a
                                  href="/"
                                  className="btn btn-primary btn-sm"
                                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', marginTop: '-5px' }}
                                >
                                  <Link
                                    to={`/product/${product.productId}`}
                                    title={product.title}
                                  >
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                  </Link>
                                </a>
                              </div>
                              {
                                product.discount > 0 && product.discount <= 100 ?
                                  <>
                                    <p
                                      className="cross-trending mb-0"
                                      style={{
                                        fontFamily: 'Georgia, serif',
                                        fontSize: '0.9rem',
                                        color: '#555',
                                      }}
                                    >
                                      {product.price}
                                    </p>
                                    <p
                                      className="mb-0"
                                      style={{
                                        fontFamily: 'Georgia, serif',
                                        fontSize: '0.9rem',
                                        color: '#555',
                                      }}>Rs{' '}
                                      {parseInt(
                                        parseFloat(product.price.replace("Rs ", "").replace(/,/g, "")) *
                                        (1 - parseFloat(product.discount) / 100)
                                      )}
                                    </p>


                                  </>

                                  :
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontFamily: 'Georgia, serif',
                                      fontSize: '0.9rem',
                                      color: '#555',
                                    }}
                                  >
                                    {product.price}
                                  </p>
                              }
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No products available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

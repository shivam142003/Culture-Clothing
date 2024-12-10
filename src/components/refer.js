import React from "react";
import { Link } from "react-router-dom";
import tshirt1_1 from "../images/tshirt1(1).jpg";
import tshirt2_1 from "../images/tshirt2(1).jpg";
import tshirt3_1 from "../images/tshirt3(1).jpg";
export default function Trendingproducts (){
  const products = [
  ];

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
                      All
                    </a>
                    <a
                      href="/"
                      className="nav-link text-uppercase fs-6"
                      id="nav-fruits-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-fruits"
                    >
                      Drops
                    </a>
                    <a
                      href="/"
                      className="nav-link text-uppercase fs-6"
                      id="nav-juices-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-juices"
                    >
                      Others
                    </a>
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
                    {products.map((product) => (
                      <div className="col" key={product.id}>
                        <div className="product-item text-center"  style={{ background: 'none', border: 'none', margin: '0px' }}>
                          <figure className="m-0 p-0">
                            <Link to={`/product/${product.id}`} title={product.title}>
                              <img
                                src={product.image}
                                className="tab-image img-fluid"
                                loading="lazy"
                                alt={product.title}
                                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                              />
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
                                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem',marginTop: '-5px' }}
                              >
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                              </a>
                            </div>
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
                          </div>
                        </div>
                      </div>
                    ))}
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

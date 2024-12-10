// AllProducts.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/Productpage.css"; // Add necessary CSS for styling
import tshirt1 from "../images/tshirt1(1).jpg";
import tshirt1_2 from "../images/tshirt1(2).jpg";
import tshirt1_3 from "../images/tshirt1(3).jpg";
import tshirt2_1 from "../images/tshirt2(1).jpg";
import tshirt2_2 from "../images/tshirt2(2).jpg";
import tshirt3_1 from "../images/tshirt3(1).jpg";
import tshirt3_2 from "../images/tshirt3(2).jpg";
import white_rose_1 from '../images/White_rose_1.jpg';
import white_rose_2 from '../images/White_rose_2.jpg';
import black_tiger_2 from '../images/black_tiger_2.jpg';
import black_tiger_3 from '../images/black_tiger_3.jpg';
import black_tiger_4 from '../images/black_tiger_4.jpg';
import black_snake_1 from '../images/black_snake_1.jpg';
import black_snake_2 from '../images/black_snake_2.jpg';
import black_snake_3 from '../images/black_snake_3.jpg';
import black_snake_4 from '../images/black_snake_4.jpg';
import black_snake_5 from '../images/black_snake_5.jpg';
import black_snake_6 from '../images/black_snake_6.jpg';
import black_snake_7 from '../images/black_snake_7.jpg';

// Sample products data (hardcoded)
const products = [
  {
    id: 1,
    title: "Navy Materialistic T-Shirt",
    images: [tshirt1, tshirt1_2, tshirt1_3],
    price: "Rs 2,999",
    description: "A stylish navy t-shirt made from high-quality material.",
  },
  {
    id: 2,
    title: "Red Edition",
    images: [tshirt2_1, tshirt2_2],
    price: "Rs 3,999",
    description: "Bold red t-shirt for a standout look.",
  },
  {
    id: 3,
    title: "Green Edition",
    images: [tshirt3_1, tshirt3_2],
    price: "Rs 4,499",
    description: "Comfortable and vibrant green t-shirt.",
  },
  {
    id: 4,
    title: "Blue Edition",
    images: [tshirt1, tshirt1_2, tshirt1_3],
    price: "Rs 6,499",
    description: "A cool blue oversized fit t-shirt.",
  },
  {
    id: 5,
    title: "Black Oversized Fit",
    images: [tshirt2_1, tshirt2_2],
    price: "Rs 2,499",
    description: "Comfortable black t-shirt for all occasions.",
  },
  {
    id: 6,
    title: "White Rose",
    images: [white_rose_1,white_rose_2],
    price: "Rs 2,499",
    description: "Comfortable black t-shirt for all occasions.",
  },
  {
    id: 7,
    title: "Black Snake",
    images: [black_snake_1,black_snake_2,black_snake_3,black_snake_4,black_snake_5,black_snake_6,black_snake_7],
    price: "Rs 2,499",
    description: "Comfortable black t-shirt for all occasions.",
  },
  {
    id: 8,
    title: "Black Tiger",
    images: [black_tiger_2,black_tiger_3,black_tiger_4],
    price: "Rs 2,499",
    description: "Comfortable black t-shirt for all occasions.",
  },
  // Add more products as needed...
];

const AllProducts = () => {
  return (
    <div className="all-products-container container mt-3">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="product-card card">
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                <img
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.price}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

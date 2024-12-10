// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import "../css/Productpage.css"; // Ensure the CSS file is properly imported


import tshirt1 from '../images/tshirt1(1).jpg';
import tshirt1_2 from '../images/tshirt1(2).jpg';
import tshirt1_3 from '../images/tshirt1(3).jpg';
import tshirt2_1 from '../images/tshirt2(1).jpg';
import tshirt2_2 from '../images/tshirt2(2).jpg';
import tshirt3_1 from '../images/tshirt3(1).jpg';
import tshirt3_2 from '../images/tshirt3(2).jpg';
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
    id: 6,
    title: "White Rose",
    images: [white_rose_1, white_rose_2],
    price: "Rs 2,499",
    description: "Elegant white rose design.",
  },
  {
    id: 7,
    title: "Black Snake",
    images: [black_snake_1, black_snake_2, black_snake_3, black_snake_4, black_snake_5, black_snake_6, black_snake_7],
    price: "Rs 2,499",
    description: "Edgy black snake design.",
  },
  {
    id: 8,
    title: "Black Tiger",
    images: [black_tiger_2, black_tiger_3, black_tiger_4],
    price: "Rs 2,499",
    description: "Ferocious black tiger print.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container mt-5">
      <h2>{product.title}</h2>
      <div className="product-images">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.title} ${index + 1}`}
            style={{ width: "300px", marginRight: "10px" }}
          />
        ))}
      </div>
      <p>{product.description}</p>
      <h4>{product.price}</h4>
    </div>
  );
};

export default ProductDetail;

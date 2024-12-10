import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import '../css/Admin.css';

export default function Admin() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    care: [],
    composition: [],
    shipping: [],
    price: ''
  });

  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('totalProducts');
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data); // Set the fetched products in the state
        localStorage.setItem('products', JSON.stringify(response.data)); // Store products in localStorage
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
  //   setProducts(storedProducts);
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Generic handler for array inputs (care, composition, shipping)
  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;

    const updatedArray = value.split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: updatedArray,
    }));
  };

  // const handleImageChange = (e) => {
  //   setImages(e.target.files); // Store the selected files in state
  // };

  const handleImageChange = (e) => {
    const files = e.target.files; // Get selected files
    const newImages = Array.from(files); // Convert file list to an array

    // Append the new images to the existing images
    setImages((prevImages) => [...prevImages, ...newImages]); // Add to the existing image array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append non-file fields
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("care", product.care);
    formData.append("composition", product.composition);
    formData.append("shipping", product.shipping);

    // Append multiple images
    Array.from(images).forEach((image) => {
      formData.append("images", image);  // Append each image file to the FormData object
    });

    try {
      const response = await axios.post("http://localhost:5000/api/products/addproduct", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProducts([...products, response.data]); // Add the new product to the list
      alert('Product added successfully!');

      // Reset form fields
      setProduct({
        title: '',
        description: '',
        care: [],
        composition: [],
        shipping: [],
        price: ''
      });
      setImages([]);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId)); // Remove deleted product from state
      alert('Product deleted successfully!');
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };



  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditArrayChange = (e) => {
    const { name, value } = e.target;
    const updatedArray = value.split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    setEditProduct(prevProduct => ({
      ...prevProduct,
      [name]: updatedArray,
    }));
  };

  const handleEditTrendingChange = (e) => {
    const { checked } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      trending: checked,
    }));
  };

  const handleDiscountchange = (e) => {
    const { value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      discount: Math.max(0, Math.min(100, Number(value))), // Ensure discount is between 0 and 100
    }));
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to update the product by its ID
      const response = await axios.put(
        `http://localhost:5000/api/products/${editProduct._id}`,
        editProduct
      );

      alert('Product updated successfully!');

      // Update the product list in state with the updated product data
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === editProduct._id ? response.data : p))
      );

      // Reset the edit state and return to the product list
      setEditProduct(null);
      setView('totalProducts');
    } catch (error) {
      // console.error("Error updating product:", error);
      alert('Failed to update the product.');
    }
  };


  return (
    <div className="container-fluid admin-container">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 p-0 bg-dark">
          <div className="sidebar p-3">
            <h4 className="text-center mb-4">Admin Panel</h4>
            <ul className="nav flex-column">
              <li className="nav-item" onClick={() => setView('totalProducts')}>
                <a className={`nav-link ${view === 'totalProducts' ? 'active' : ''}`}>Total Products</a>
              </li>
              <li className="nav-item" onClick={() => setView('addNewProduct')}>
                <a className={`nav-link ${view === 'addNewProduct' ? 'active' : ''}`}>Add New Product</a>
              </li>
              <li className="nav-item" onClick={() => setView('removeProduct')}>
                <a className={`nav-link ${view === 'removeProduct' ? 'active' : ''}`}>Remove Product</a>
              </li>
              <li className="nav-item" onClick={() => setView('editProduct')}>
                <a className={`nav-link ${view === 'editProduct' ? 'active' : ''}`}>Edit Product</a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="col-12 col-md-9 col-lg-10 p-4">
          {view === 'addNewProduct' && (
            <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
              <h2 className="admin-title text-center mb-4">Add New Product</h2>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    value={product.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">Price (Rs)</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="form-control"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={product.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="care" className="form-label">Care Instructions (each sentence on a new line)</label>
                  <textarea
                    name="care"
                    id="care"
                    className="form-control"
                    value={product.care.join('\n')}  // Join the array into a string with newlines
                    onChange={handleArrayInputChange}
                    rows={5}
                    placeholder="Enter care instructions here..."
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="composition" className="form-label">Composition (each item on a new line)</label>
                  <textarea
                    name="composition"
                    id="composition"
                    className="form-control"
                    value={product.composition.join('\n')} // Join the array into a string with newlines
                    onChange={handleArrayInputChange}
                    rows={5}
                    placeholder="Enter composition details here..."
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label htmlFor="shipping" className="form-label">Shipping Details (each item on a new line)</label>
                  <textarea
                    name="shipping"
                    id="shipping"
                    className="form-control"
                    value={product.shipping.join('\n')}
                    onChange={handleArrayInputChange}
                    rows={5}
                    placeholder="Enter shipping details here..."
                  />
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="images" className="form-label">Product Images</label>
                  <input
                    type="file"
                    name="images"
                    id="images"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          )}
          {view === 'removeProduct' && (
            <div>
              <h2 className="text-center mb-4">Remove Product</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        {product.images.length > 0 && (
                          <img
                            src={`http://localhost:5000${product.images[0]}`} // Display the first image
                            alt={`product-image`}
                            style={{ width: '100px', height: '100px', margin: '5px' }}
                          />
                        )}
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {view === 'editProduct' && (
            <div>
              <h2 className="text-center mb-4">Edit Product</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.productId}>
                      <td>
                        {product.images.length > 0 && (
                          <img
                            src={`http://localhost:5000${product.images[0]}`} // Display the first image
                            alt={`product-image`}
                            style={{ width: '100px', height: '100px', margin: '5px' }}
                          />
                        )}
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() => setEditProduct(product)} // Set the product to be edited
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {editProduct && (
                <form onSubmit={handleEditSubmit} className="admin-form mt-4">
                  <h3 className="text-center mb-4">Edit Product: {editProduct.title}</h3>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      value={editProduct.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      className="form-control"
                      value={editProduct.price}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="care" className="form-label">Care Instructions</label>
                    <textarea
                      id="care"
                      name="care"
                      className="form-control"
                      rows="4"
                      value={editProduct.care.join('\n')}
                      onChange={handleEditArrayChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="composition" className="form-label">Composition</label>
                    <textarea
                      id="composition"
                      name="composition"
                      className="form-control"
                      rows="4"
                      value={editProduct.composition.join('\n')}
                      onChange={handleEditArrayChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="shipping" className="form-label">Shipping</label>
                    <textarea
                      id="shipping"
                      name="shipping"
                      className="form-control"
                      rows="4"
                      value={editProduct.shipping.join('\n')}
                      onChange={handleEditArrayChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trending" className="form-label">Trending</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="trending"
                        name="trending"
                        className="form-check-input"
                        checked={editProduct.trending}
                        onChange={handleEditTrendingChange}
                      />
                      <label className="form-check-label" htmlFor="trending">
                        Mark as Trending
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Discount (%)</label>
                    <input
                      type="number"
                      id="discount"
                      name="discount"
                      className="form-control"
                      value={editProduct.discount || ''}
                      onChange={handleDiscountchange} // Use the dedicated handler
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                    />
                  </div>

                  <button type="submit" className="btn btn-success">Save Changes</button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setEditProduct(null)} // Close the form
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

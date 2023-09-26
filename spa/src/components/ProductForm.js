// src/components/ProductForm.js
import React, { useEffect, useState } from "react";

const ProductForm = ({ addProduct, updateProduct, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (product) {
      updateProduct({ ...formData, id: product.id });
    } else {
      addProduct(formData);
    }
    setFormData({
      name: '',
      description: '',
      price: '',
      category: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-wrap align-items-end my-4">
      <div className="me-3 mb-2">
        <label htmlFor="productName" className="me-2 form-label">Nom du produit</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={formData.name}
          onChange={handleChange}
          name="name"
          placeholder="Nom du produit"
        />
      </div>
      <div className="me-3 mb-2">
        <label htmlFor="productDescription" className="me-2 form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="productDescription"
          value={formData.description}
          onChange={handleChange}
          name="description"
          placeholder="Description"
        />
      </div>
      <div className="me-3 mb-2">
        <label htmlFor="productPrice" className="me-2 form-label">Prix</label>
        <input
          type="number"
          className="form-control"
          id="productPrice"
          value={formData.price}
          onChange={handleChange}
          name="price"
          placeholder="Prix"
        />
      </div>
      <div className="me-3 mb-2">
        <label htmlFor="productCategory" className="me-2 form-label">Catégorie</label>
        <input
          type="text"
          className="form-control"
          id="productCategory"
          value={formData.category}
          onChange={handleChange}
          name="category"
          placeholder="Catégorie"
        />
      </div>
      <div className="mb-2">
        <button type="submit" className="btn btn-primary">{product ? "Sauvegarder" : "Ajouter"}</button>
      </div>
    </form>

  );
};

export default ProductForm;

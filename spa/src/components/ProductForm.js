// src/components/ProductForm.js
import React, { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });

  const submitHandler = event => {
    event.preventDefault();
    if (!product.name || !product.price) return;
    addProduct(product);
    setProduct({ name: "", description: "", price: "", category: "" });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={product.name}
        onChange={e => setProduct({ ...product, name: e.target.value })}
        placeholder="Nom du produit"
      />
      <input
        type="text"
        value={product.description}
        onChange={e => setProduct({ ...product, description: e.target.value })}
        placeholder="Description"
      />
      <input
        type="number"
        value={product.price}
        onChange={e => setProduct({ ...product, price: e.target.value })}
        placeholder="Prix"
      />
      <input
        type="text"
        value={product.category}
        onChange={e => setProduct({ ...product, category: e.target.value })}
        placeholder="Catégorie"
      />
      <button type="submit" className="btn btn-primary">Ajouter</button>
    </form>
  );
};

export default ProductForm;

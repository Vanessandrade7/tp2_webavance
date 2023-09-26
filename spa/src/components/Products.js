import React, { useState } from "react";
import ProductForm from "./ProductForm";

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Produit 1", description: "Description 1", price: 20, category: "Catégorie 1" },
    // ... autres produits
  ]);

  const addProduct = product => {
    product.id = products.length + 1;
    setProducts([...products, product]);
  };

  const deleteProduct = id => {
    setProducts(products.filter(product => product.id !== id));
  };

  const updateProduct = updatedProduct => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const handleDelete = id => {
    deleteProduct(id);
  };

  const handleUpdate = product => {
    const updatedProduct = { ...product, name: prompt("Changer le nom du produit", product.name) };
    if (updatedProduct.name) {
      updateProduct(updatedProduct);
    }
  };

  return (
    <div className="container mt-4">
      <ProductForm addProduct={addProduct} />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleUpdate(product)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

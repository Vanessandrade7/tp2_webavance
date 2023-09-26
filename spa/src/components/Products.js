import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/produits`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits :", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async product => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/produits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      setProducts(prevProducts => [...prevProducts, data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
    }
  };

  const deleteProduct = async id => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/produits/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  const updateProduct = async updatedProduct => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/produits/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === updatedProduct.id ? data : product
        )
      );

      setEditingProduct(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit :", error);
    }
  };

  const handleDelete = id => {
    deleteProduct(id);
  };

  const handleUpdate = product => {
    setEditingProduct(product);
  };

  return (
    <div className="container mt-4">
      <ProductForm
        addProduct={addProduct}
        updateProduct={updateProduct}
        product={editingProduct}
      />
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

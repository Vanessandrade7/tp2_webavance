const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());

const PORT = 3001;

app.use(bodyParser.json());

// Lire les données du fichier produits.json
const readData = () => {
  const data = fs.readFileSync('produits.json', 'utf8');
  return JSON.parse(data);
};

// Écrire des données dans le fichier produits.json
const writeData = (data) => {
  fs.writeFileSync('produits.json', JSON.stringify(data, null, 2));
};

// Endpoint pour créer un nouveau produit
app.post('/produits', (req, res) => {
  const products = readData();
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  writeData(products);
  res.status(201).send(newProduct);
});

// Endpoint pour obtenir la liste des produits
app.get('/produits', (req, res) => {
  const products = readData();
  res.send(products);
});

// Endpoint pour mettre à jour un produit
app.put('/produits/:id', (req, res) => {
  const products = readData();
  const id = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === id);
  if (index === -1) {
    return res.status(404).send({ message: 'Produit non trouvé' });
  }
  const updatedProduct = { ...products[index], ...req.body, id };
  products[index] = updatedProduct;
  writeData(products);
  res.send(updatedProduct);
});

// Endpoint pour supprimer un produit
app.delete('/produits/:id', (req, res) => {
  const products = readData();
  const id = parseInt(req.params.id);
  const newProducts = products.filter(product => product.id !== id);
  if (products.length === newProducts.length) {
    return res.status(404).send({ message: 'Produit non trouvé' });
  }
  writeData(newProducts);
  res.send({ message: 'Produit supprimé' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

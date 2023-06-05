import express from 'express';
import { ProductManager } from '../ProductManager.js';

const router = express.Router();
const productsPath = '../products.json';
const productManager = new ProductManager(productsPath);

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  await productManager.addProduct(newProduct);
  res.status(201).json({ message: 'Producto agregado exitosamente' });
});

router.put('/:pid', async (req, res) => {
  const productId = req.params.pid;
  const fieldsToUpdate = req.body;
  await productManager.updateProduct(productId, fieldsToUpdate);
  res.json({ message: 'Producto actualizado exitosamente' });
});

router.delete('/:pid', async (req, res) => {
  const productId = req.params.pid;
  await productManager.deleteProduct(productId);
  res.json({ message: 'Producto eliminado exitosamente' });
});

export default router;
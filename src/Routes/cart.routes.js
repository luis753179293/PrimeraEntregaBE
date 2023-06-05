import express from 'express';
import { CartManager } from '../CartManager.js';

const router = express.Router();
const cartsPath = '../carts.json';
const cartManager = new CartManager(cartsPath);

router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartManager.getCartById(cartId);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;
  await cartManager.addProductToCart(cartId, productId, quantity);
  res.json({ message: 'Producto agregado al carrito exitosamente' });
});

export default router;
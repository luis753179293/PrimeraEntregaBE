import express from 'express';
import { CartManager } from '../CartManager.js';

const router = express.Router();
const cartsPath = './carts.json';
const cartManager = new CartManager(cartsPath);

router.post('/', async (req, res) => {
  try{
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  }catch(error){
    console.log(error)
    res.status(400).json({error: 'Bad request'})
  }
});

router.get('/:cid', async (req, res) => {
  try{
    const cartId = parseInt(req.params.cid) ;
    const cart = await cartManager.getCartById(cartId);
    res.json(cart.products);
  }catch (error){
    console.log(error)
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try{
    const cartId = parseInt(req.params.cid) ;
    const productId = parseInt (req.params.pid);
    const quantity = 1;
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito exitosamente' });
  }catch (error){
    res.status(400).json({error: 'Bad request'})
  }
  
});

export default router;
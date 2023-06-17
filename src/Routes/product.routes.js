import express from 'express';
import { ProductManager } from '../ProductManager.js';

const router = express.Router();
const productsPath = './products.json';
const productManager = new ProductManager(productsPath);



router.get('/realtimeproducts', async (req, res) => {
  
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);
    const io = req.app.locals.io;
    io.emit('productosActualizados', limitedProducts);

    res.render('layout', {
      title: 'Lista de Productos',
      productos: limitedProducts
    }); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const limitedProducts = products.slice(0, limit);

    res.render('layout', {
      title: 'Lista de Productos',
      productos: limitedProducts
    }); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.get('/:pid', async (req, res) => {
  try  {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.log(error)
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', async (req, res) => {
  try{
    const newProduct = req.body ;
    await productManager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado exitosamente' });
  } catch (error){
    res.status(400).json({error: 'Bad request'})
  }
  
});

router.put('/:pid', async (req, res) => {
  try{
    const productId = parseInt(req.params.pid) ;
    const fieldsToUpdate = req.body;
    await productManager.updateProduct(productId, fieldsToUpdate);
    res.json({ message: 'Producto actualizado exitosamente' });
  }catch(error){
    console.log(error)
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', async (req, res) => {
  try{
    const productId = parseInt(req.params.pid) ;
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente' });
  }catch (error){
    console.log(error)
    res.status(404).json({ error: 'Producto no encontrado' });
  }
  
});

export default router;
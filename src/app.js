import express from 'express';

import productRoutes from './Routes/product.routes.js';
import cartRoutes from './Routes/cart.routes.js';

const port = 8080;
const app = express();


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
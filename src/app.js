import express, { urlencoded } from 'express';
import handlebars from 'express-handlebars';
import productRoutes from './Routes/product.routes.js';
import cartRoutes from './Routes/cart.routes.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const port = 8080;
const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}))

const httpServer = app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const socketServer = new Server(httpServer)
app.locals.io = socketServer;

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+ '/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  req.io = socketServer;
  next();
});
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', async (req , res)=>{
  res.render('socket')
})

socketServer.on('connection', (socket) => {
  console.log('Cliente conectado en el back');
 
});



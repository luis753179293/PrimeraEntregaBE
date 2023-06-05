import fs from 'fs';

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    const carts = await this.getCarts();
    const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
    const newCart = {
      id,
      products: [],
    };
    carts.push(newCart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  async getCarts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = await fs.promises.readFile(this.path, 'utf8');
    return JSON.parse(data);
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex === -1) {
      console.log('El carrito no existe.');
      return;
    }
    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts));
  }
}
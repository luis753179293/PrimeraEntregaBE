import fs from 'fs';

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    product.id = id;
    if (!products.some(prod => prod.code === product.code)) {
      products.push(product);
    } else {
      console.log('El código ya existe.');
      return;
    }

    if (
      product.title !== undefined &&
      product.code !== null &&
      product.description !== undefined &&
      product.price !== null
    ) {
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log('Faltan propiedades en el producto.');
    }
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = await fs.promises.readFile(this.path, 'utf8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async updateProduct(id, fieldsToUpdate) {
    const products = await this.getProducts();
    const indexToUpdate = products.findIndex(product => product.id === id);
    if (indexToUpdate === -1) {
      console.log('El objeto no existe.');
      return;
    }
    const productToUpdate = products[indexToUpdate];
    Object.assign(productToUpdate, fieldsToUpdate);
    products.splice(indexToUpdate, 1, productToUpdate);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return true;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const indexToDelete = products.findIndex(product => product.id === id);
    if (indexToDelete === -1) {
      console.log('El objeto no existe.');
      return;
    }
    products.splice(indexToDelete, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return true;
  }
}
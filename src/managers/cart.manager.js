import mongoose from "mongoose";

const schemaCart = new mongoose.Schema({
  products: { type: Array, required: true }
}, { versionKey: false })


class cartsManager {
  constructor() {
    this.cartDB = mongoose.model('carts', schemaCart)
  }

  async addCart(carrito) {
    console.log(carrito)
    const cart = await this.cartDB.create(carrito)
    return cart
  }

  async getProductsInCart(id) {
    const cart = await this.cartDB.findById(id)
    return cart

  }

  async pushProduct(id, product) {
    const cart = await this.cartDB.findById(id)
    product.quantity += 1
    cart.products.push(product)
    return cart
  }

}

export const cartManager = new cartsManager()
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const schemaProducts = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array, required: false }

}, { versionKey: false })


class productsManager {
  constructor() {
    this.productsDB = mongoose.model('products', schemaProducts)
  }

  async getProducts(){
    const prod = this.productsDB.find().lean()
    return prod
  }

  async getProductsLimited(limit) {
    const prodsLimited = await this.productsDB.find().limit(limit).lean()
    return prodsLimited
  }

  async addProduct(product) {
    const prod = await this.productsDB.create(product)
    return prod
  }

  async getProductById(id) {
    const prod = await this.productsDB.findById(id)
    return prod
  }

  async updateProduct(id, update) {
    const filter = { _id: ObjectId(id) };
    const prod = await this.productsDB.findByIdAndUpdate(filter, update)
    return prod
  }

  async deleteProduct(id) {
    await this.productsDB.deleteOne({ _id: ObjectId(id) })
    return
  }

}

export const prodManager = new productsManager()
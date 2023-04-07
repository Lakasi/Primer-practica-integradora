import { Router } from "express"
import { cartManager } from "../managers/cart.manager.js"
import { prodManager } from "../managers/products.manager.js"

export const cartsRouter = Router()

/* ---------------------------------------------------- CARRITO ------------------------------------------------------------------- */
/* Metodo para crear carritos */
cartsRouter.post('/', async (req, res) => {
  const cart = await cartManager.addCart(req.body)
  cart ?
    res.json(cart)
    : res.json({ "message": "No se creo el carrito" })
})

/* Metodo para ver los productos dentro de un carrito en especifico */
cartsRouter.get('/:cid', async (req, res) => {
  const cart = await cartManager.getProductsInCart(req.params.cid)
  res.json(cart.products)
})

/* Metodo para agregar productos a un carrito especifico */
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  console.log('entro')
  const prod = await prodManager.getProductById(req.params.pid)
  console.log(prod)
  if (prod) {
    const cart = await cartManager.pushProduct(req.params.cid, prod)
    res.json(cart)
  } else {
    res.json({ "message": "No existe el producto en la base de datos" })
  }
})
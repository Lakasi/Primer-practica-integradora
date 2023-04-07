import express from 'express'
import { PORT } from '../config/servidor.config.js'
import { engine } from 'express-handlebars'
import { routerApi } from '../routers/routerApi.js'
import { routerVistas } from '../routers/routerVistas.js'
import { conectar } from '../database/mongoose.js'
import { productsRouter } from '../routers/productsRouter.js'
import { cartsRouter } from '../routers/cartsRouter.js'


const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.use(express.static('./public'))
app.use(express.json())

app.use('/api',routerApi)
app.use('/',routerVistas)
/* Router para los productos */
app.use("/api/products", productsRouter)
/* Router para los carritos */
app.use("/api/carts", cartsRouter)

await conectar()

app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`)
})
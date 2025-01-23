const productosRouter = require('./productosRouter')
const categoriasRouter = require('./categoriasRouter')
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/productos', productosRouter)
  router.use('/categorias',categoriasRouter)
}

module.exports = routerApi;

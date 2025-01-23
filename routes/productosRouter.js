const express = require('express');
const ProductsService = require('./../services/productoService')
const {validatorHandler} = require('../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema} = require('../schemas/productoSchema')


const router = express.Router();
const servicio = new ProductsService();


router.get('/', async(req, res) => {
  const productos = await servicio.find()

  res.json(productos);

});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const producto = await servicio.findOne(id);
      res.json(producto)
    } catch (error) {
      next(error)
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res ) => {
    const body = req.body;
    const newProducto = await servicio.create(body);
    res.status(201).json(newProducto);
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async(req, res, next) =>{
    try {
      const { id } =req.params;
      const body = req.body;
      const producto = await servicio.update(id, body)
      res.json(producto);
    } catch (error) {
      next(error)
      };

  });

router.delete ('/:id', async(req, res) =>{
  const { id } =req.params;
  const producto = await servicio.delete(id)
  res.json(producto);
});



module.exports = router;

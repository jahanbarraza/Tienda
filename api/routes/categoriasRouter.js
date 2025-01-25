
const express = require('express');
const CategoriaService = require('./../services/categoriaService')
const { validatorHandler } = require('./../middlewares/validator.handler');
const { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema } = require('./../schemas/categoriaSchema');

const router = express.Router();

const servicio = new CategoriaService();


router.get('/', async(req, res) => {
  const categorias = await servicio.find();
  res.json(categorias);
})

router.get('/:id',
  validatorHandler(getCategoriaSchema, 'params'),
  async( req, res, next )=> {
    try {
      const {id} = req.params;
      const categoria = await servicio.findOne(id)
      res.json(categoria)
    } catch (error) {
      next (error)
    }
  });

router.post('/',
  validatorHandler(createCategoriaSchema, 'body'),
  async( req, res ) => {
    const body = req.body;
    const newCategoria = await servicio.create(body);
    res.status(201).json(newCategoria);
  }
);

router.patch('/:id',
  validatorHandler(getCategoriaSchema, 'params'),
  validatorHandler(updateCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await servicio.update(id, body)
      res.json(categoria)
    } catch (error) {
      next(error)
    };
  }
);

router.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const categoria = await servicio.delete( id )
  res.json(categoria);
});

module.exports = router;

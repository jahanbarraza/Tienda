
const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      nombre: 'Gaseosas',
      tipo: 'Liquidos',
    },
    {
      id: 2,
      nombre: 'Mecatos',
      tipo: 'Liquidos',
    },
    {
      id: 3,
      nombre: 'Licores',
      tipo: 'Liquidos',
    }

  ])
})

router.get('/:categoriaId/productos/:productoId', (req, res) =>{
  const { categoriaId, productoId } = req.params;
  res.json({
    categoriaId,
    productoId
  })
})

module.exports = router;

const express           = require('express');
const router            = express.Router();
const ProductoController = require('../controllers/ProductoController');
const auth              = require('../middlewares/auth');

// Rutas de lectura — públicas
router.get('/',    ProductoController.listar);
router.get('/:id', ProductoController.obtenerUno);

// Rutas de escritura — requieren token
router.post('/',    auth, ProductoController.crear);
router.put('/:id',  auth, ProductoController.actualizar);

module.exports = router;

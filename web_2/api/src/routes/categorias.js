const express             = require('express');
const router              = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const auth                = require('../middlewares/auth');

// Rutas de lectura — públicas
router.get('/',    CategoriaController.listar);
router.get('/:id', CategoriaController.obtenerUna);

// Rutas de escritura — requieren token
router.post('/',    auth, CategoriaController.crear);
router.put('/:id',  auth, CategoriaController.actualizar);

module.exports = router;

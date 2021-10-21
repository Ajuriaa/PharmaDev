const { Router } = require('express');
const router = Router();
const controladorProducto = require('../../controllers/controladorProducto');
router.get('/', controladorProducto.listarProductos);
router.post('/', controladorProducto.GuardarProducto);
router.delete('/', controladorProducto.EliminarQueryProducto);
router.put('/', controladorProducto.ActualizarQueryProducto);
module.exports = router;
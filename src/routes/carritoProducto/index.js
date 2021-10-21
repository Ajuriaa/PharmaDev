const { Router } = require('express');
const router = Router();
const controladorCarritoProducto = require('../../controllers/controladorCarritoProducto');
router.get('/', controladorCarritoProducto.listarPresentaciones);
router.post('/', controladorCarritoProducto.GuardarPresentacion);
router.delete('/', controladorCarritoProducto.EliminarQueryPresentacion);
router.put('/', controladorCarritoProducto.ActualizarQueryPresentacion);
module.exports = router;
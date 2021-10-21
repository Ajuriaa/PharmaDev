const { Router } = require('express');
const router = Router();
const controladorCarrito = require('../../controllers/controladorCarrito');
router.get('/', controladorCarrito.listarPresentaciones);
router.post('/', controladorCarrito.GuardarPresentacion);
router.delete('/', controladorCarrito.EliminarQueryPresentacion);
router.put('/', controladorCarrito.ActualizarQueryPresentacion);
module.exports = router;
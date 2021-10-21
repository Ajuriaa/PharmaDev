const { Router } = require('express');
const router = Router();
const controladorCarrito = require('../../controllers/controladorCarrito');
router.get('/', controladorCarrito.listarCarritos);
router.post('/', controladorCarrito.Guardar);
router.delete('/', controladorCarrito.EliminarQuery);
router.put('/', controladorCarrito.ActualizarQuery);
module.exports = router;
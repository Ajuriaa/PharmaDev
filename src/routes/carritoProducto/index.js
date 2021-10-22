const { Router } = require('express');
const router = Router();
const controladorCarritoProducto = require('../../controllers/controladorCarritoProducto');
router.get('/', controladorCarritoProducto.listarCarritoProductos);
router.post('/', controladorCarritoProducto.Guardar);
router.delete('/', controladorCarritoProducto.EliminarQuery);
router.put('/', controladorCarritoProducto.ActualizarQuery);
module.exports = router;
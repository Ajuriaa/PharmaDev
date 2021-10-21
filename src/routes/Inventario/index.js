const { Router } = require('express');
const router = Router();
const cotroladorInventario = require('../../controllers/cotroladorInventario');
router.get('/', cotroladorInventario.listarPresentaciones);
router.post('/', cotroladorInventario.GuardarPresentacion);
router.delete('/', cotroladorInventario.EliminarQueryPresentacion);
router.put('/', cotroladorInventario.ActualizarQueryPresentacion);
module.exports = router;
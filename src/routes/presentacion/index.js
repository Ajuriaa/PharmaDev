const { Router } = require('express');
const router = Router();
const controladorPresentacion = require('../../controllers/controladorPresentacion');
router.get('/', controladorPresentacion.listarPresentaciones);
router.post('/', controladorPresentacion.GuardarPresentacion);
router.delete('/', controladorPresentacion.EliminarQueryPresentacion);
router.put('/', controladorPresentacion.ActualizarQueryPresentacion);
module.exports = router;
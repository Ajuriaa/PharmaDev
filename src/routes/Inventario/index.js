const { Router } = require('express');
const router = Router();
const controladorInventario = require('../../controllers/controladorInventario');
router.get('/', controladorInventario.listarInventarios);
router.post('/', controladorInventario.Guardar);
router.delete('/', controladorInventario.EliminarQuery);
router.put('/', controladorInventario.ActualizarQuery);
module.exports = router;
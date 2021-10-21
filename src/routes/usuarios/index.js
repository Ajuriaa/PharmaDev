const { Router } = require('express');
const router = Router();
const controladorUsuarios = require('../../controllers/contraladorUsuarios');
router.get('/', controladorUsuarios.listarUsuarios);
router.post('/', controladorUsuarios.Guardar);
router.delete('/', controladorUsuarios.EliminarQuery);
router.put('/', controladorUsuarios.ActualizarQuery);
module.exports = router;
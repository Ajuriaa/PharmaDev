const { Router } = require('express');
const router = Router();
const controladorLaboratorios = require('../../controllers/controladorLaboratorios');
router.get('/', controladorLaboratorios.listarLaboratorios);
router.post('/', controladorLaboratorios.Guardar);
router.delete('/', controladorLaboratorios.EliminarQuery);
router.put('/', controladorLaboratorios.ActualizarQuery);
module.exports = router;
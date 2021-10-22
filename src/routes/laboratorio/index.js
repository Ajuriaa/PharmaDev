const {
    Router
} = require('express');
const router = Router();
const {
    body
} = require('express-validator');
const controladorLaboratorios = require('../../controllers/controladorLaboratorios');

router.get('/', controladorLaboratorios.listarLaboratorios);
router.post('/',
    body('laboratorioNombre').isLength({
        min: 3
    }).withMessage('El nombre del laboratorio debe tener al menos 3 caracteres'),
    controladorLaboratorios.Guardar);
router.delete('/', controladorLaboratorios.Eliminar);
router.put('/',
    body('laboratorioNombre').isLength({
        min: 3
    }).withMessage('El nombre del laboratorio debe tener al menos 3 caracteres'),
    controladorLaboratorios.Actualizar);
module.exports = router;
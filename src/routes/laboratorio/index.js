const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorLaboratorios = require('../../controllers/controladorLaboratorios')
const controladorAutenticacion = require("../../controllers/controladorAutenticacion")

router.get('/', controladorAutenticacion.validarAutenticado, controladorLaboratorios.listarLaboratorios)
router.post('/',
    body('laboratorioNombre').isLength({
        min: 3
    }).withMessage('El nombre del laboratorio debe tener al menos 3 caracteres'),
    controladorAutenticacion.validarAutenticado,
    controladorLaboratorios.Guardar)
router.delete('/', controladorAutenticacion.validarAutenticado, controladorLaboratorios.Eliminar)
router.put('/',
    body('laboratorioNombre').isLength({
        min: 3
    }).withMessage('El nombre del laboratorio debe tener al menos 3 caracteres'),
    controladorAutenticacion.validarAutenticado,
    controladorLaboratorios.Actualizar)
module.exports = router

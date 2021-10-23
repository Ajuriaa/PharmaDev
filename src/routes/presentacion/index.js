const { Router } = require('express')
const controladorPresentacion = require('../../controllers/controladorPresentacion')
const controladorAutenticacion = require('../../controllers/controladorAutenticacion')
const { body } = require('express-validator')
const router = Router()
router.get('/', 
    controladorAutenticacion.validarAutenticado,
    controladorPresentacion.listarPresentaciones)
router.post('/',
    body('presentacionNombre').isLength({
        min: 3, max: 25
    })
    .withMessage('La longitud minima del nombre es de 3 caracteres y maximo de 25'),
    body('presentacionDescripcion').isLength({
        min: 5, max: 250
    })
    .withMessage('Inserte la descripcion del producto con mas de 5 caracteres y menos de 250'),
    controladorAutenticacion.validarAutenticado,
    controladorPresentacion.GuardarPresentacion)
router.delete('/', 
    controladorAutenticacion.validarAutenticado,
    controladorPresentacion.EliminarQueryPresentacion)
router.put('/',
    body('presentacionNombre').isLength({
        min: 3, max: 25
    })
    .withMessage('La longitud minima del nombre es de 3 caracteres y maximo de 25'),
    body('presentacionDescripcion').isLength({
        min: 5, max: 250
    })
    .withMessage('Inserte la descripcion del producto con mas de 5 caracteres y menos de 250'),
    controladorAutenticacion.validarAutenticado,
    controladorPresentacion.ActualizarQueryPresentacion)
module.exports = router
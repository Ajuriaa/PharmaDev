const { Router } = require('express')
const controladorOrdenProducto = require('../../controllers/controladorOrdenProducto')
const controladorAutenticacion = require('../../controllers/controladorAutenticacion')
const { body } = require('express-validator')
const router = Router()
router.get('/', controladorOrdenProducto.listarOrdenProducto)
router.post('/',
    body('productoId').isInt().withMessage('Ingrese una id de producto valida'),
    body('ordenId').isInt().withMessage('Ingrese una id de orden valida'),
    body('ordenProductoCantidad').notEmpty().isNumeric().withMessage('Este campo no puede estar vacio')
    .matches('^[0-9]*$').withMessage('Este Campo debe ser un numero'),
    controladorAutenticacion.validarAutenticado,
    controladorOrdenProducto.GuardarOrdenProducto)
router.delete('/', controladorOrdenProducto.EliminarQueryOrdenProducto)
router.put('/',
    body('productoId').isInt().withMessage('Ingrese una id de producto valida'),
    body('ordenId').isInt().withMessage('Ingrese una id de orden valida'),
    body('ordenProductoCantidad').notEmpty().isNumeric().withMessage('Este campo no puede estar vacio')
    .matches('^[0-9]*$').withMessage('Este Campo debe ser un numero'),
    controladorAutenticacion.validarAutenticado,
    controladorOrdenProducto.ActualizarQueryOrdenProducto)
module.exports = router
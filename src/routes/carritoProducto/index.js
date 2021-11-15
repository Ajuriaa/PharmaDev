const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorCarritoProducto = require('../../controllers/controladorCarritoProducto')
const controladorAutenticacion = require("../../controllers/controladorAutenticacion")

router.get('/',
    controladorAutenticacion.validarAutenticado,
    controladorCarritoProducto.listarCarritoProductos)

router.post('/productos',
    controladorAutenticacion.validarAutenticado,
    controladorCarritoProducto.listarProductos)

router.post('/',
    body(
        "carritoProductoCantidad"
    ).matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Debe ingresar solo numeros en la cantidad producto"),
    controladorAutenticacion.validarAutenticado,
    controladorCarritoProducto.Guardar)
router.delete('/',
    controladorAutenticacion.validarAutenticado,
    controladorCarritoProducto.EliminarQuery)
router.put('/',
    body(
        "carritoProductoCantidad"
    ).matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Debe ingresar solo numeros en la cantidad producto"),
    controladorAutenticacion.validarAutenticado,
    controladorCarritoProducto.ActualizarQuery)
module.exports = router
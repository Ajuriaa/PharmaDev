const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorCarritoProducto = require('../../controllers/controladorCarritoProducto')
router.get('/', controladorCarritoProducto.listarCarritoProductos)
router.post('/',
    body(
        "carritoProductoCantidad"
    ).matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Debe ingresar solo numeros en la cantidad producto"),

    controladorCarritoProducto.Guardar)
router.delete('/', controladorCarritoProducto.EliminarQuery)
router.put('/',
    body(
        "carritoProductoCantidad"
    ).matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage("Debe ingresar solo numeros en la cantidad producto"),
    controladorCarritoProducto.ActualizarQuery)
module.exports = router
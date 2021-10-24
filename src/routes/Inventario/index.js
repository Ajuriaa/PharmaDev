const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorInventario = require('../../controllers/controladorInventario')
const controladorAutenticacion = require("../../controllers/controladorAutenticacion")
router.get('/',
    controladorAutenticacion.validarAutenticado,
    controladorInventario.listarInventarios)
router.post('/',
    body(
        "inventarioExistencias"
    )
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en la existencia del inventario'),
    body(
        "inventarioFechaCaducidad"
    )
    .isLength({
        min:10,
        max:10
    })
    .withMessage('Debe ingresar la fecha de caducidad'),
    body(
        "productoId"
    )
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Es el identificar de producto debe de ser numerico'),
    controladorAutenticacion.validarAutenticado,
    controladorInventario.Guardar)
router.delete('/',
    controladorAutenticacion.validarAutenticado,
    controladorInventario.EliminarQuery)
router.put('/',
    body(
        "inventarioExistencias"
    )
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en la existencia del inventario'),
    body(
        "productoId"
    )
    .isLength(
        {
            min:1
        }
    )
    .withMessage('Debe enviar el id del producto')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Es el identificar de producto debe de ser numerico'),
    controladorAutenticacion.validarAutenticado,
    controladorInventario.ActualizarQuery)
module.exports = router
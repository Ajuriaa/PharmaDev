const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorCarrito = require('../../controllers/controladorCarrito')
const controladorAutenticacion = require("../../controllers/controladorAutenticacion")

router.get('/',
    controladorAutenticacion.validarAutenticado,
    controladorCarrito.listarCarritos)

router.post('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    controladorAutenticacion.validarAutenticado,
    controladorCarrito.Guardar)

router.delete('/',
    controladorAutenticacion.validarAutenticado,
    controladorCarrito.EliminarQuery)
router.put('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    controladorAutenticacion.validarAutenticado,
    controladorCarrito.ActualizarQuery)
module.exports = router
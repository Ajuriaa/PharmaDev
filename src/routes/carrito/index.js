const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorCarrito = require('../../controllers/controladorCarrito')
router.get('/', controladorCarrito.listarCarritos)

router.post('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    controladorCarrito.Guardar)

router.delete('/', controladorCarrito.EliminarQuery)
router.put('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    controladorCarrito.ActualizarQuery)

module.exports = router

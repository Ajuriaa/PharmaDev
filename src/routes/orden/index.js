const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladoOrdenes = require('../../controllers/controladorOrdenes')

router.get('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    body('ordenSubtotal')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en subtotal'),
    body('ordenImpuesto')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Impuesto'),
    body('ordenDescuento')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Descuento'),
    body('ordenTotal')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Total'),
    controladoOrdenes.listarOrdenes)
router.post('/', controladoOrdenes.Guardar)
router.delete('/', controladoOrdenes.Eliminar)
router.put('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    body('ordenSubtotal')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en subtotal'),
    body('ordenImpuesto')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Impuesto'),
    body('ordenDescuento')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Descuento'),
    body('ordenTotal')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en Total'),
    controladoOrdenes.Actualizar)
module.exports = router
const {
    Router
} = require('express');
const router = Router();
const {
    body
} = require('express-validator');
const controladorInventario = require('../../controllers/controladorInventario');
router.get('/', controladorInventario.listarInventarios);
router.post('/',
    body(
        "inventarioExistencia"
    )
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en la existencia del inventario'),

    body(
        "inventarioFechaCaducidad"
    )
    .isEmpty()
    .withMessage('Debe ingresar la fecha de caducidad'),

    body(
        "productoId"
    )
    .isEmpty()
    .withMessage('Debe enviar el id del producto')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Es el identificar de producto debe de ser numerico'),

    controladorInventario.Guardar);
router.delete('/', controladorInventario.EliminarQuery);
router.put('/',
    body(
        "inventarioExistencia"
    )
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en la existencia del inventario'),

    body(
        "inventarioFechaCaducidad"
    )
    .isEmpty()
    .withMessage('Debe ingresar la fecha de caducidad'),

    body(
        "productoId"
    )
    .isEmpty()
    .withMessage('Debe enviar el id del producto')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Es el identificar de producto debe de ser numerico'),



    controladorInventario.ActualizarQuery);
module.exports = router;
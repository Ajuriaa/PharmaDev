const { Router } = require('express')
const controladorProducto = require('../../controllers/controladorProducto')
const controladorAutenticacion = require('../../controllers/controladorAutenticacion')
const { body } = require('express-validator')
const router = Router()
router.get('/', 
    controladorAutenticacion.validarAutenticado,
    controladorProducto.listarProductos)
router.post('/productos',controladorAutenticacion.validarAutenticado,controladorProducto.buscarProducto)
router.post('/producto',controladorAutenticacion.validarAutenticado,controladorProducto.buscarProducto)

    router.post('/',
    body('productoNombre').isLength({
        min: 3, max: 25
    })
    .withMessage('La longitud minima del nombre es de 3 caracteres y maximo de 25'),
    body('productoDescripcion').isLength({
        min: 5, max: 250
    })
    .withMessage('Inserte la descripcion del producto con mas de 5 caracteres y menos de 250'),
    body('productoPrecio').isFloat({
        min: 1
    })
    .withMessage('El valor del producto debe ser mayor que 0'),
    body('laboratorioId').isInt().withMessage('Ingrese una id de laboratorio valida'),
    body('presentacionId').isInt().withMessage('Este campo no puede estar vacio'),
    controladorAutenticacion.validarAutenticado,
    controladorProducto.GuardarProducto)
router.delete('/', 
    controladorAutenticacion.validarAutenticado,
    controladorProducto.EliminarQueryProducto)
router.put('/',
    body('productoNombre').isLength({
        min: 3, max: 25
    })
    .withMessage('La longitud minima del nombre es de 3 caracteres y maximo de 25'),
    body('productoDescripcion').isLength({
        min: 5, max: 250
    })
    .withMessage('Inserte la descripcion del producto con mas de 5 caracteres y menos de 250'),
    body('productoPrecio').isFloat({
        min: 1
    })
    .withMessage('El valor del producto debe ser mayor que 0'),
    body('productoFechaCreado').isEmpty().withMessage('Este campo no puede estar vacio'),
    body('laboratorioId').isInt().withMessage('Ingrese una id de laboratorio valida'),
    body('presentacionId').isInt().withMessage('Este campo no puede estar vacio'),
    controladorAutenticacion.validarAutenticado,
    controladorProducto.ActualizarQueryProducto)
    router.post('/busqueda',controladorAutenticacion.validarAutenticado,controladorProducto.buscarProductos)
module.exports = router
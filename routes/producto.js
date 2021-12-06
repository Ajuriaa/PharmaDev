const { Router } = require('express')
const { listarProductos, buscarProducto, crearProducto, eliminarP, editarP } = require('../controllers/producto')
const { validarAutenticado } = require('../controllers/autenticacion')
const { body } = require('express-validator')
const router = Router()

router.get('/allP', validarAutenticado,listarProductos)
router.post('/oneP', validarAutenticado,buscarProducto)
router.post('/addP', validarAutenticado, crearProducto )
router.delete('/delP', validarAutenticado, eliminarP )
router.put('/updateP', validarAutenticado, editarP )

module.exports = router
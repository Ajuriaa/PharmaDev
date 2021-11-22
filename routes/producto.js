const { Router } = require('express')
const { listarProductos, buscarProducto } = require('../controllers/producto')
const { validarAutenticado } = require('../controllers/autenticacion')
const router = Router()

router.get('/allP', validarAutenticado,listarProductos)
router.post('/oneP', validarAutenticado,buscarProducto)

module.exports = router
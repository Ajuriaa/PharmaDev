const { Router } = require('express')
const { buscarProductos, Guardar, EliminarP } = require('../controllers/carritoproducto')
const { validarAutenticado } = require('../controllers/autenticacion')
const router = Router()

router.post('/allP', validarAutenticado,buscarProductos)
router.post('/addCP', validarAutenticado,Guardar)
router.delete('/delP', validarAutenticado,EliminarP)

module.exports = router
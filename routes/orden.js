const { Router } = require('express')
const { validarAutenticado } = require('../controllers/autenticacion')
const { body } = require('express-validator')
const { generarOrden } = require('../controllers/orden')
const router = Router()

router.post('/newO', generarOrden)

module.exports = router
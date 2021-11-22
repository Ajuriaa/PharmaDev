const { Router } = require('express')
const router = Router()
const { body } = require('express-validator')
const autenticacion = require("../controllers/autenticacion")

router.post('/login',
    body("usuario")
        .isEmpty()
        .withMessage("Debe enviar los datos del usuario correo o telefono"),
    body("usuarioContrasena")
        .isLength({ min: 5 }).withMessage("La longitud minima de la contraseña es de 5 caracteres"),
    autenticacion.inicioSesion)

router.get('/error', autenticacion.ValidarToken)

router.post('/recPass',
    body("correo")
        .isEmpty()
        .withMessage("Debe enviar un correo electrónico"),
    autenticacion.validarAutenticado, autenticacion.recuperarContraseña)

module.exports = router
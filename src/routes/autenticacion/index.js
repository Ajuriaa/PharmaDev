const {
    Router
} = require('express')
const router = Router()
const {
    body
} = require('express-validator')
const controladorAutenticacion = require("../../controllers/controladorAutenticacion")

router.post('/iniciosesion',
body("usuario")
.isEmpty()
.withMessage("Debe enviar los datos del usuario correo o telefono"),
body("usuarioContrasena")
.isLength({min:5}).withMessage("La longitud minima de la contraseña es de 5 caracteres"),
controladorAutenticacion.inicioSesion)
router.get('/error', controladorAutenticacion.ValidarToken)

module.exports = router
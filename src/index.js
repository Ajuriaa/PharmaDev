const {
    Router
} = require('express');
const controladorUsuarios = require('../../controllers/controladorUsuarios');
const Usuario = require('../../models/modeloUsuario')
const {
    body
} = require('express-validator');
const router = Router();
router.get('/', controladorUsuarios.listarUsuarios);
router.post('/',
    body('usuarioCorreo').isEmail()
    .withMessage('Debe ingresar un correo electronico valido'),
    body('usuarioNombre').isLength({
        min: 3
    })
    .withMessage('La longitud minima del nombre es de 3 caracteres'),
    body('usuarioContrasena').isLength({ min: 5 })
    .withMessage('La longitud minima de la contraseña es de 5+ caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un numero'),
    controladorUsuarios.Guardar);
// router.delete('/', controladorUsuarios.EliminarQuery);
// router.put('/', controladorUsuarios.ActualizarQuery);
module.exports = router;
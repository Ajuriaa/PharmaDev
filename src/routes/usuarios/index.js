const {Router} = require('express');
const controladorUsuarios = require('../../controllers/controladorUsuarios');
const {body} = require('express-validator');
const router = Router();
router.get('/', controladorUsuarios.listarUsuarios);
router.post('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    body('usuarioCorreo').isEmail()
    .withMessage('Debe ingresar un correo electronico valido'),
    body('usuarioNombre').isLength({
        min: 5
    })
    .withMessage('La longitud minima del nombre es de 5+ caracteres'),
    body('usuarioContrasena').isLength({
        min: 5
    })
    .withMessage('La longitud minima de la contraseña es de 5+ caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('La contraseña debe contener mayusculas minusculas y un numero'),
    body('usuarioTelefono').isLength({
        min: 8,
        min: 8
    })
    .withMessage('El numero de telefono debe contener 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('El numero de telefono solo debe contener numeros'),
    body('usuarioFechaNacimiento').isEmpty()
    .withMessage('Debe ingresar su fecha de nacimiento'),
    controladorUsuarios.Guardar);


router.delete('/', controladorUsuarios.EliminarQuery);
router.put('/',
    body('usuarioId').isLength({
        min: 13,
        max: 13
    })
    .withMessage('El numero de identidad debe contener 13 numeros')
    .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[0-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
    .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    body('usuarioCorreo').isEmail()
    .withMessage('Debe ingresar un correo electronico valido'),
    body('usuarioNombre').isLength({
        min: 5
    })
    .withMessage('La longitud minima del nombre es de 5+ caracteres'),
    body('usuarioContrasena').isLength({
        min: 5
    })
    .withMessage('La longitud minima de la contraseña es de 5+ caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('La contraseña debe contener mayusculas minusculas y un numero'),
    body('usuarioTelefono').isLength({
        min: 8,
        min: 8
    })
    .withMessage('El numero de telefono debe contener 8 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('El numero de telefono solo debe contener numeros'),
    controladorUsuarios.ActualizarQuery);
module.exports = router;
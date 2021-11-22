const { Router } = require('express')
const { body } = require('express-validator')
const { guardar, listarUsuarios, Eliminar, UploadImg } = require('../controllers/usuario')
const router = Router()

router.post('/newU',
    body('usuarioContrasena').isLength({
        min: 5
    })
        .withMessage('La longitud minima de la contraseña es de 5+ caracteres')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
        .withMessage('La contraseña debe contener mayusculas minusculas y un numero'),
    guardar)

router.get('/allU', listarUsuarios)

router.delete('/delU', Eliminar)

router.post('/addIMG',
    body('Id').isLength({
        min: 13,
        max: 13
    })
        .withMessage('Debe enviar el id del usuario')
        .matches(/^[+]?([0-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/)
        .withMessage('Debe ingresar solo numeros en el identificador de usuario'),
    UploadImg)

module.exports = router
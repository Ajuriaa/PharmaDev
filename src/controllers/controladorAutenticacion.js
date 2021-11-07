const modeloUsuario = require("../models/modeloUsuario")
const {
    validationResult
} = require("express-validator")
const moment = require("moment")
const msj = require("../components/mensaje")
const passport = require("../config/passport")
const {
    Op
} = require("sequelize")
const Usuario = require("../models/modeloUsuario")

exports.validarAutenticado = passport.validarAutenticado
exports.inicioSesion = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            usuario,
            usuarioContrasena
        } = req.body
        const buscarUsuario = await modeloUsuario.findOne({
            where: {
                [Op.or]: [{
                    usuarioCorreo: usuario
                }, {
                    usuarioTelefono: usuario
                }]
            }
        })
        if (!buscarUsuario) {
            msj("El usuario no existe o se encuentra inactivo", 200, "", res)
        } else {
            if (!buscarUsuario.verificarContrasena(usuarioContrasena, buscarUsuario.usuarioContrasena)) {
                msj("El usuario no existe o contraseña invalida", 200, [], res)
            } else {
                const usu = {
                    usuarioNombre: buscarUsuario.usuarioNombre,
                    usuarioTelefono: buscarUsuario.usuarioTelefono,
                    usuarioCorreo: buscarUsuario.usuarioCorreo,
                    usuarioAdmin: buscarUsuario.usuarioAdmin,
                    usuarioFechaNacimiento: buscarUsuario.usuarioFechaNacimiento,
                    usuarioDireccion: buscarUsuario.usuarioDireccion,
                    usuarioSexo: buscarUsuario.usuarioSexo,
                }
                const token = passport.getToken({
                    usuarioId: buscarUsuario.usuarioId
                })
                usu.token = token
                var datos ={ 
                    usuario : usu
                }
                msj("Bienvenido, " + usu.usuarioNombre, 200, datos, res)
            }
        }

    }
}
exports.ValidarToken = async (req, res) => {
    const {
        data
    } = req.body
    msj("Token invalido", 200, data, res)
}

exports.enviarToken = async (req, res) => {
    const {
        data
    } = req.body
    res.status(200).json(data)
}
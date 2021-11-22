const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require("express-validator")
const moment = require("moment")
const passport = require("../config/passport")
const nodemailer = require("../config/correo")
const { Op } = require("sequelize")
const bcrypt = require('bcrypt');

exports.validarAutenticado = passport.validarAutenticado

exports.inicioSesion = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty) {
        msj("Los datos ingresados no son validos", 200, "", res)
    } else {
        const {
            usuario,
            usuarioContrasena
        } = req.body
        const buscarUsuario = await db.Usuario.findOne({
            include: [db.Carrito],
            where: {
                [Op.or]: [{
                    usuarioCorreo: usuario
                }, {
                    usuarioTelefono: usuario
                }]
            }
        })
        // console.log(buscarUsuario)
        if (!buscarUsuario) {
            msj("El usuario no existe o se encuentra inactivo", 200, "", res)
        } else {
            if (!bcrypt.compareSync(usuarioContrasena, buscarUsuario.usuarioContrasena)) {
                msj("El usuario no existe o contraseña invalida", 200, "", res)
            } else {
                buscarUsuario.usuarioUltimoLog = moment()
                await buscarUsuario.save()
                const usu = {
                    Id: buscarUsuario.Id,
                    usuarioNombre: buscarUsuario.usuarioNombre,
                    usuarioTelefono: buscarUsuario.usuarioTelefono,
                    usuarioCorreo: buscarUsuario.usuarioCorreo,
                    usuarioAdmin: buscarUsuario.usuarioAdmin,
                    usuarioFechaNacimiento: buscarUsuario.usuarioFechaNacimiento,
                    usuarioDireccion: buscarUsuario.usuarioDireccion,
                    usuarioSexo: buscarUsuario.usuarioSexo,
                    carritoId: buscarUsuario.Carritos
                }
                const token = passport.getToken({
                    Id: buscarUsuario.Id
                })
                usu.token = token
                var datos = {
                    usuario: usu
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

exports.recuperarContraseña = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty) {
        msj("Los datos ingresados no son validos", 200, "", res)
        return
    } else {
        const { correo } = req.body
        const buscarCliente = await db.Usuario.findOne({
            where: {
                usuarioCorreo: correo
            }
        })
        const temppass = '123456'
        const hash = bcrypt.hashSync(temppass, 10)
        if (buscarCliente) {
            buscarCliente.usuarioContrasena = hash
            await buscarCliente.save()
            const data = {
                correo: buscarCliente.usuarioCorreo,
                contraseña: temppass
            }
            nodemailer.recuperarcontraseña(data)
            msj("correo enviado", 200, "", res)
            return
        } else {
            msj("Los datos ingresados no son válidos", 200, "", res)
            return
        }
    }
}
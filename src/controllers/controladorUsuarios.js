const Usuario = require('../models/modeloUsuario')
const msj = require('../components/mensaje')
const Carrito = require("../models/modeloCarrito")
const {
    validationResult
} = require('express-validator')
const {
    Op
} = require("sequelize")

exports.listarUsuarios = async (req, res) => {
    const usu = await Usuario.findAll()
    msj("Peticion procesada correctamente", 200, usu, res)
}


exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            usuarioId,
            usuarioNombre,
            usuarioTelefono,
            usuarioCorreo,
            usuarioContrasena,
            usuarioAdmin,
            usuarioFechaNacimiento,
            usuarioDireccion,
            usuarioSexo,
            usuarioImagen

        } = req.body
        if (!usuarioTelefono) {
            if (!usuarioCorreo) {
                msj("Debe agregar su teléfono o correo electrónico", 200, [], res)
                return
            }
        }
        if (!usuarioCorreo) {
            if (!usuarioTelefono) {
                msj("Debe agregar su teléfono o correo electrónico", 200, [], res)
                return
            }
        }
        const BuscarUsuario = await Usuario.findOne({
            where: {
                [Op.or]: [{
                    usuarioCorreo: usuarioCorreo,
                    usuarioId: usuarioId
                }, {
                    usuarioTelefono: usuarioTelefono,
                    usuarioId: usuarioId
                }]
            }
        })
        if (!BuscarUsuario) {
            const nuevoUsuario = await Usuario.create({
                usuarioId: usuarioId,
                usuarioNombre: usuarioNombre,
                usuarioTelefono: usuarioTelefono,
                usuarioCorreo: usuarioCorreo,
                usuarioContrasena: usuarioContrasena,
                usuarioAdmin: usuarioAdmin,
                usuarioFechaNacimiento: usuarioFechaNacimiento,
                usuarioDireccion: usuarioDireccion,
                usuarioSexo: usuarioSexo
            }).then(async(dato) => {
                const nuevoCarrito = await Carrito.create({
                    carritoEstado: "Actual",
                    usuarioId: usuarioId
                })
                msj("Registro almacenado correctamente", 200, dato, res)
            }).catch((error) => {
                msj("Error al guardar los datos", 200, error, res)
            })
        } else {
            msj("El correo electronico o el numero de identidad ya esta en uso", 200, [], res)
        }
    }
}

exports.Eliminar = async (req, res) => {
    const {
        usuarioId
    } = req.body
    if (!usuarioId) {
        msj("Debe enviar el numero de identidad del usuario", 200, [], res)
    } else {
        const buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        })
        if (!buscarUsuario) {
            msj("El usuario no existe", 200, [], res)
        } else {
            await Usuario.destroy({
                where: {
                    usuarioId: usuarioId,
                }
            }).then((data) => {
                msj("El registro ha sido eliminado", 200, [data], res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, [error], res)
            })
        }
    }
}

exports.Actualizar = async (req, res) => {
    const {
        usuarioId,
        usuarioNombre,
        usuarioTelefono,
        usuarioCorreo,
        usuarioContrasena,
        usuarioAdmin,
        usuarioFechaNacimiento,
        usuarioDireccion,
        usuarioSexo
    } = req.body
    if (!usuarioId) {
        msj("Debe enviar el numero de identidad del usuario", 200, [], res)
    } else {
        var buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        })
        if (!buscarUsuario) {
            msj("El usuario no existe", 200, [], res)
        } else {
            if (buscarUsuario.usuarioCorreo == usuarioCorreo) {
                if (!usuarioNombre || !usuarioTelefono || !usuarioCorreo || !usuarioContrasena || !usuarioFechaNacimiento || !usuarioDireccion || !usuarioSexo) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarUsuario.usuarioNombre = usuarioNombre
                    buscarUsuario.usuarioTelefono = usuarioTelefono
                    buscarUsuario.usuarioCorreo = usuarioCorreo
                    buscarUsuario.usuarioContrasena = usuarioContrasena
                    buscarUsuario.usuarioAdmin = usuarioAdmin
                    buscarUsuario.usuarioFechaNacimiento = usuarioFechaNacimiento
                    buscarUsuario.usuarioDireccion = usuarioDireccion
                    buscarUsuario.usuarioSexo = usuarioSexo
                    await buscarUsuario.save()
                    msj("Registro actualizado", 200, [], res)
                }
            } else {
                const BuscarUsuario2 = await Usuario.findOne({
                    where: {
                        usuarioCorreo: usuarioCorreo
                    }
                })
                if (!BuscarUsuario2) {
                    if (!usuarioNombre || !usuarioTelefono || !usuarioCorreo || !usuarioContrasena || !usuarioFechaNacimiento || !usuarioDireccion || !usuarioSexo) {
                        msj("Debe enviar los datos completos", 200, [], res)
                    } else {
                        buscarUsuario.usuarioNombre = usuarioNombre
                        buscarUsuario.usuarioTelefono = usuarioTelefono
                        buscarUsuario.usuarioCorreo = usuarioCorreo
                        buscarUsuario.usuarioContrasena = usuarioContrasena
                        buscarUsuario.usuarioAdmin = usuarioAdmin
                        buscarUsuario.usuarioFechaNacimiento = usuarioFechaNacimiento
                        buscarUsuario.usuarioDireccion = usuarioDireccion
                        buscarUsuario.usuarioSexo = usuarioSexo
                        await buscarUsuario.save()
                        msj("Registro actualizado", 200, [], res)
                    }
                } else {
                    msj("El correo electronico ya esta en uso", 500, [], res)
                }
            }
        }
    }
}
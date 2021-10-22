const Usuario = require('../models/modeloUsuario');
const msj = require('../components/mensaje');
const {
    validationResult
} = require('express-validator');
const {
    Op
} = require("sequelize");

exports.listarUsuarios = async (req, res) => {
    const usu = await Usuario.findAll();
    msj("Peticion procesada correctamente", 200, usu, res)
};


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
            usuarioSexo
        } = req.body;
        const BuscarUsuario = await Usuario.findOne({
            where: {
                [Op.or]:{
                    usuarioCorreo: usuarioCorreo,
                    usuarioId: usuarioId
                }
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
            }).then((dato) => {
                // console.log(dato);
                // res.send("Registro almacenado correctamente");
                msj("Registro almacenado correctamente", 200, dato, res)

            }).catch((error) => {
                // console.log(error);
                // res.send("Error al guardar los datos");
                msj("Error al guardar los datos", 200, error, res)

            });
        } else {
            msj("El correo electronico o el numero de identidad ya esta en uso", 200, [], res)
        }


        // msj("Peticion procesada correctamente", 200, [], res)
    }
};

exports.EliminarQuery = async (req, res) => {
    const {
        usuarioId
    } = req.query;
    if (!usuarioId) {
        // res.send("Debe enviar el numero de identidad del usuario");
        msj("Debe enviar el numero de identidad del usuario", 200, [], res)
    } else {
        const buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        });
        if (!buscarUsuario) {
            // res.send("El usuario no existe");
            msj("El usuario no existe", 200, [], res)
        } else {
            await Usuario.destroy({
                where: {
                    usuarioId: usuarioId,
                }
            }).then((data) => {
                // console.log(data);
                // res.send("El registro ha sido eliminado");
                msj("El registro ha sido eliminado", 200, [data], res)

            }).catch((error) => {
                // console.log(error);
                // res.send("El registro no fue eliminado, porque hay un eror en el servidor");
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, [error], res)

            });
        }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const {
        usuarioId
    } = req.query;
    const {
        usuarioNombre,
        usuarioTelefono,
        usuarioCorreo,
        usuarioContrasena,
        usuarioAdmin,
        usuarioFechaNacimiento,
        usuarioDireccion,
        usuarioSexo
    } = req.body;

    if (!usuarioId) {
        msj("Debe enviar el numero de identidad del usuario", 200, [], res)
    } else {
        var buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        });
        if (!buscarUsuario) {
            // res.send("El usuario no existe");
        msj("El usuario no existe", 200, [], res)

        } else {

            if (!usuarioNombre || !usuarioTelefono || !usuarioCorreo || !usuarioContrasena || !usuarioFechaNacimiento || !usuarioDireccion || !usuarioSexo) {
                // res.send("Debe enviar los datos completos");
                msj("Debe enviar los datos completos", 200, [], res)

            } else {
                buscarUsuario.usuarioNombre = usuarioNombre;
                buscarUsuario.usuarioTelefono = usuarioTelefono;
                buscarUsuario.usuarioCorreo = usuarioCorreo;
                buscarUsuario.usuarioContrasena = usuarioContrasena;
                buscarUsuario.usuarioAdmin = usuarioAdmin;
                buscarUsuario.usuarioFechaNacimiento = usuarioFechaNacimiento;
                buscarUsuario.usuarioDireccion = usuarioDireccion;
                buscarUsuario.usuarioSexo = usuarioSexo;
                await buscarUsuario.save();
                // console.log(buscarUsuario);
                msj("Registro actualizado", 200, [], res)

            }
        }
    }
};
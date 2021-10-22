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

        // msj("Peticion procesada correctamente", 200, [], res)
    }
};

exports.EliminarQuery = async (req, res) => {
    const {
        usuarioId
    } = req.query;
    if (!usuarioId) {
        res.send("Debe enviar el numero de identidad del usuario");
    } else {
        const buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        });
        if (!buscarUsuario) {
            res.send("El usuario no existe");
        } else {
            await Usuario.destroy({
                where: {
                    usuarioId: usuarioId,
                }
            }).then((data) => {
                console.log(data);
                res.send("El registro ha sido eliminado");
            }).catch((error) => {
                console.log(error);
                res.send("El registro no fue eliminado, porque hay un eror en el servidor");
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
        usuarioRegistradoEl,
        usuarioFechaNacimiento,
        usuarioDireccion,
        usuarioSexo,
        usuarioUltimoLog
    } = req.body;

    if (!usuarioId) {
        res.send("Debe enviar el numero de identidad del usuario");
    } else {
        var buscarUsuario = await Usuario.findOne({
            where: {
                usuarioId: usuarioId,
            }
        });
        if (!buscarUsuario) {
            res.send("El usuario no existe");
        } else {

            if (!usuarioNombre || !usuarioTelefono || !usuarioCorreo || !usuarioContrasena || !usuarioAdmin || !usuarioFechaNacimiento || !usuarioDireccion || !usuarioSexo || !usuarioUltimoLog) {
                res.send("Debe enviar los datos completos");
            } else {
                buscarUsuario.usuarioNombre = usuarioNombre;
                buscarUsuario.usuarioTelefono = usuarioTelefono;
                buscarUsuario.usuarioCorreo = usuarioCorreo;
                buscarUsuario.usuarioContrasena = usuarioContrasena;
                buscarUsuario.usuarioAdmin = usuarioAdmin;
                buscarUsuario.usuarioFechaNacimiento = usuarioFechaNacimiento;
                buscarUsuario.usuarioDireccion = usuarioDireccion;
                buscarUsuario.usuarioSexo = usuarioSexo;
                buscarUsuario.usuarioUltimoLog = usuarioUltimoLog;
                await buscarUsuario.save();
                console.log(buscarUsuario);
                res.send("Registro actualizado");
            }
        }
    }
};
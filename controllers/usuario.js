const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const fileUpload = require('express-fileupload');
const { Op } = require('sequelize')
const bcrypt = require('bcrypt');

// Almacenar Usuarios
exports.guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            Id,
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
                msj("Debe agregar su teléfono o correo electrónico", 200, "", res)
                return
            }
        }
        if (!usuarioCorreo) {
            if (!usuarioTelefono) {
                msj("Debe agregar su teléfono o correo electrónico", 200, "", res)
                return
            }
        }
        const hash = bcrypt.hashSync(usuarioContrasena, 10)
        await db.Usuario.create({
            Id: Id,
            usuarioNombre: usuarioNombre,
            usuarioTelefono: usuarioTelefono,
            usuarioCorreo: usuarioCorreo,
            usuarioContrasena: hash,
            usuarioAdmin: usuarioAdmin,
            usuarioFechaNacimiento: usuarioFechaNacimiento,
            usuarioDireccion: usuarioDireccion,
            usuarioSexo: usuarioSexo
        }).then((dato) => {
            db.Carrito.create({
                UsuarioId: Id
            }).then(msj("Registro almacenado correctamente", 200, dato, res))
        }).catch((error) => {
            msj("Error al guardar los datos", 200, error, res)
        })
    }

}

// Listar Usuarios
exports.listarUsuarios = (req, res) => {
    db.Usuario.findAll({ include: [db.Carrito], }).then(allU => res.send(msj("Peticion procesada correctamente", 200, allU, res)))
}

exports.Eliminar = (req, res) => {
// Eliminar un usuario
    const { Id } = req.body
    if (!Id) {
        msj("Debe enviar el numero de identidad del usuario", 200, "", res)
    } else {
        const buscarUsuario = db.Usuario.findOne({
            where: { Id: Id }
        })
        if (!buscarUsuario) {
            msj("El usuario no existe", 200, "", res)
        } else {
            const buscarCarrito = db.Carrito.findAll({
                where: { UsuarioId: Id }
            })
            if (!buscarCarrito) {
                db.Usuario.destroy({
                    where: { Id: Id }
                }).then((data) => {
                    msj("El registro ha sido eliminado", 200, "", res)
                }).catch((error) => {
                    msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, [error], res)
                })
            } else {
                db.Carrito.destroy({
                    where: { UsuarioId: Id }
                }).then(
                    db.Usuario.destroy({
                        where: { Id: Id }
                    }).then((data) => {
                        msj("El registro ha sido eliminado", 200, data, res)
                    }).catch((error) => {
                        msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, [error], res)
                    })
                ).catch((error) => {
                    msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, [error], res)
                })
            }
        }
    }
}

// Subir imagen de usuario
exports.UploadImg = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        let sampleFile;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.send(msj("No subió ningún archivo", 500, "", res));
        }
        sampleFile = req.files.sampleFile;
        sampleFile.name = req.body.Id + '.png' || "error.png"
        uploadPath = process.cwd() + '/public/users/' + sampleFile.name;
        sampleFile.mv(uploadPath, function (err) {
            if (err)
                return res.send(msj("Ocurrió un error", 500, err, res));
            res.send(msj("Archivo subido", 200, { uri: 'http:192.168.0.2:7777/users/' + sampleFile.name }, res));
        });
    }
}
const Carrito = require('../models/modeloCarrito');
const msj = require('../components/mensaje');
exports.listarCarritos = async (req, res) => {
    const {
        validationResult
    } = require('express-validator');
    const usu = await Carrito.findAll();
    msj("Peticion procesada correctamente", 200, usu, res)
};

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            carritoEstado,
            usuarioId
        } = req.body;
        if (!carritoEstado || !usuarioId) {
            msj("Debe enviar los datos completos", 200, [], res)
        } else {
            const nuevoCarrito = await Carrito.create({
                carritoEstado: carritoEstado,
                usuarioId: usuarioId
            }).then((dato) => {
                msj("Registro almacenado correctamente", 200, dato, res)
            }).catch((error) => {
                msj("Error al guardar los datos", 200, error, res)
            });
        }
    }

};

exports.EliminarQuery = async (req, res) => {
    const {
        carritoId
    } = req.query;
    if (!carritoId) {
        msj("Debe enviar el Id del Carrito", 200, [], res)
    } else {
        const buscarCarrito = await Carrito.findOne({
            where: {
                carritoId: carritoId,
            }
        });
        if (!buscarCarrito) {
            msj("El Carrito no existe", 200, [], res)
        } else {
            await Carrito.destroy({
                where: {
                    carritoId: carritoId,
                }
            }).then((data) => {
                msj("El registro ha sido  eliminado", 200, data, res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un error en el servidor", 200, error, res)

            });
        }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            carritoId
        } = req.query;
        const {
            carritoActualizadoEl,
            carritoEstado,
            usuarioId
        } = req.body;

        if (!carritoId) {
            msj("Debe enviar el Id del Carrito", 200, [], res)
        } else {
            var buscarCarrito = await Carrito.findOne({
                where: {
                    carritoId: carritoId,
                }
            });
            if (!buscarCarrito) {
                res.send("El Carrito no existe");

            } else {

                if (!usuarioId || !carritoActualizadoEl || !carritoEstado) {
                    msj("Debe enviar los datos completos", 200, [], res)

                } else {
                    buscarCarrito.carritoActualizadoEl = carritoActualizadoEl;
                    buscarCarrito.carritoEstado = carritoEstado;
                    buscarCarrito.usuarioId = usuarioId
                    await buscarCarrito.save();
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
};
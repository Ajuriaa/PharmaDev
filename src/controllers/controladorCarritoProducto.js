const CarritoProducto = require('../models/modeloCarritoProducto')
const msj = require('../components/mensaje')
const {
    validationResult
} = require('express-validator')
exports.listarCarritoProductos = async (req, res) => {
    const usu = await CarritoProducto.findAll()
    msj("peticion procesada correctamente", 200, usu, res)
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            productoId,
            carritoId,
            carritoProductoCantidad
        } = req.body
        if (!productoId || !carritoId || !carritoProductoCantidad) {
            msj("Debe enviar los datos completos", 200, [], res)
        } else {
            const nuevoCarritoProducto = await CarritoProducto.create({
                productoId: productoId,
                carritoId: carritoId,
                carritoProductoCantidad: carritoProductoCantidad,

            }).then((dato) => {
                console.log(dato)
                msj("Registro almacenado correctamente", 200, dato, res)
            }).catch((error) => {
                console.log(error)
                msj("Error al guardar los datos", 200, error, res)
            })
        }
    }
}

exports.EliminarQuery = async (req, res) => {
    const {
        carritoProductoId
    } = req.query
    if (!carritoProductoId) {
        msj("Debe enviar el Id del CarritoProducto", 200, [], res)
    } else {
        const buscarCarritoProducto = await CarritoProducto.findOne({
            where: {
                carritoProductoId: carritoProductoId,
            }
        })
        if (!buscarCarritoProducto) {
            msj("El carritoProducto no existe", 200, [], res)
        } else {
            await CarritoProducto.destroy({
                where: {
                    carritoProductoId: carritoProductoId,
                }
            }).then((data) => {
                console.log(data)
                msj("El registro ha sido  eliminado", 200, [], data)
            }).catch((error) => {
                console.log(error)
                msj("El registro no fue eliminado, porque hay un error en el servidor", 200, error, res)
            })
        }
    }
}

exports.ActualizarQuery = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            carritoProductoId
        } = req.query
        const {
            productoId,
            carritoId,
            carritoProductoFechaActualizado,
            carritoProductoCantidad,
            carritoProductoActivo
        } = req.body

        if (!carritoProductoId) {
            msj("Debe enviar el Id del CarritoProducto", 200, [], res)
        } else {
            var buscarCarritoProducto = await CarritoProducto.findOne({
                where: {
                    carritoProductoId: carritoProductoId,
                }
            })
            if (!buscarCarritoProductoId) {
                msj("El CarritoProducto no existe", 200, [], res)
            } else {

                if (!productoId || !carritoId || !carritoProductoFechaActualizado || !carritoProductoCantidad || !carritoProductoActivo) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarCarritoProducto.productoId = productoId
                    buscarCarritoProducto.carritoId = carritoId,
                        buscarCarritoProducto.carritoProductoFechaActualizado = carritoProductoFechaActualizado,
                        buscarCarritoProducto.carritoProductoCantidad = carritoProductoCantidad,
                        buscarCarritoProducto.carritoProductoActivo = carritoProductoActivo,
                        await buscarCarritoProducto.save()
                    console.log(buscarCarritoProducto)
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
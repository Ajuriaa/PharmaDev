const Orden = require('../models/modeloOrden')
const msj = require('../components/mensaje')
const {
    validationResult
} = require('express-validator')

exports.listarOrdenes = async (req, res) => {
    const usu = await Orden.findAll()
    msj("Peticion procesada correctamente", 200, usu, res)
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            usuarioId,
            ordenEstado,
            ordenSubtotal,
            ordenDescuento,
            ordenImpuestos,
            ordenTotal
        } = req.body
        if (!usuarioId || !ordenEstado || !ordenSubtotal || !ordenDescuento || !ordenImpuestos || !ordenTotal) {
            msj("Debe enviar los datos completos", 200, [], res)
        } else {
            const nuevoOrden = await Orden.create({
                usuarioId: usuarioId,
                ordenEstado: ordenEstado,
                ordenSubtotal: ordenSubtotal,
                ordenDescuento: ordenDescuento,
                ordenImpuestos: ordenImpuestos,
                ordenTotal: ordenTotal
            }).then((dato) => {
                msj("Registro almacenado correctamente", 200, dato, res)
            }).catch((error) => {
                msj("Error al guardar los datos", 200, error, res)
            })
        }
    }
}

exports.Eliminar = async (req, res) => {
    const {
        ordenId
    } = req.body
    if (!ordenId) {
        msj("Debe enviar el identificador de la Orden", 200, [], res)
    } else {
        const buscarOrden = await Orden.findOne({
            where: {
                ordenId: ordenId,
            }
        })
        if (!buscarOrden) {
            msj("La Orden no existe", 200, [], res)
        } else {
            await Orden.destroy({
                where: {
                    ordenId: ordenId,
                }
            }).then((data) => {
                msj("El registro ha sido eliminado", 200, data, res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, error, res)
            })
        }
    }
}

exports.Actualizar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            ordenId,
            usuarioId,
            ordenEstado,
            ordenSubtotal,
            ordenDescuento,
            ordenImpuestos,
            ordenTotal
        } = req.body

        if (!ordenId) {
            msj("Debe enviar el numero de identidad del Orden", 200, [], res)
        } else {
            var buscarOrden = await Orden.findOne({
                where: {
                    ordenId: ordenId,
                }
            })
            if (!buscarOrden) {
                msj("La Orden no existe", 200, [], res)
            } else {

                if (!usuarioId || !ordenEstado || !ordenSubtotal || !ordenDescuento || !ordenImpuestos || !ordenTotal) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarOrden.usuarioId = usuarioId
                    buscarOrden.ordenEstado = ordenEstado
                    buscarOrden.ordenSubtotal = ordenSubtotal
                    buscarOrden.ordenDescuento = ordenDescuento
                    buscarOrden.ordenImpuestos = ordenImpuestos
                    buscarOrden.ordenTotal = ordenTotal
                    await buscarOrden.save()
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
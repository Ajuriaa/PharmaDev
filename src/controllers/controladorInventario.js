const Inventario = require('../models/modeloInventario')
const msj = require('../components/mensaje')
const {
    validationResult
} = require('express-validator')
exports.listarInventarios = async (req, res) => {
    const usu = await Inventario.findAll()
    msj("Peticion procesada correctamente", 200, [], res)
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            inventarioExistencia,
            inventarioFechaCaducidad,
            productoId
        } = req.body
        if (!inventarioExistencia || !inventarioFechaCaducidad || !productoId) {
            msj("Debe enviar los datos completos", 200, [], res)
        } else {
            const nuevoInventario = await Inventario.create({
                inventarioExistencia: inventarioExistencia,
                inventarioFechaCaducidad: inventarioFechaCaducidad,
                productoId: productoId
            }).then((dato) => {
                console.log(dato)
                msj("Registro almacenado correctamente", 200, [], res)
            }).catch((error) => {
                console.log(error)
                res.send("Error al guardar los datos")
            })
        }
    }
}

exports.EliminarQuery = async (req, res) => {
    const {
        inventarioId
    } = req.query
    if (!inventarioId) {
        res.send("Debe enviar el Id del Inventario")
        msj("Debe enviar el Id del Inventario", 200, [], res)
    } else {
        const buscarInventario = await Inventario.findOne({
            where: {
                inventarioId: inventarioId,
            }
        })
        if (!buscarInventario) {
            msj("El Inventario no existe", 200, [], res)
        } else {
            await Inventario.destroy({
                where: {
                    inventarioId: inventarioId,
                }
            }).then((data) => {
                console.log(data)
                msj("El registro ha sido  eliminado", 200, [], res)
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
            inventarioId
        } = req.query
        const {
            inventarioExistencia,
            inventarioFechaCaducidad,
            productoId
        } = req.body

        if (!inventarioId) {
            res.send("Debe enviar el Id del Inventario")
            msj("Debe enviar el Id del Inventarip", 200, [], res)
        } else {
            var buscarInventario = await Inventario.findOne({
                where: {
                    inventarioId: inventarioId,
                }
            })
            if (!buscarInventario) {
                msj("Debe enviar el Id del Carrito", 200, [], res)
            } else {

                if (!inventarioExistencia || !inventarioFechaCaducidad || !productoId) {
                    res.send("Debe enviar los datos completos")
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarInventario.inventarioExistencia = inventarioExistencia
                    buscarInventario.inventarioFechaCaducidad = inventarioFechaCaducidad
                    buscarInventario.productoId = productoId
                    await buscarInventario.save()
                    console.log(buscarInventario)
                    msj("Debe enviar el Id del Carrito", 200, [], res)
                }
            }
        }
    }
}
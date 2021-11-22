const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

exports.buscarProductos = (req, res) => {
    db.CarritoProducto.findAll({
        include: [db.Producto],
        where: {
            CarritoId: req.body.CarritoId
        }
    }).then(allP => res.send(msj("Peticion procesada correctamente", 200, allP, res)))
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            ProductoId,
            CarritoId,
            CarritoProductoCantidad
        } = req.body
        const buscarPr = await db.CarritoProducto.findOne({
            where: {
                [Op.and]: [{
                    ProductoId: ProductoId,
                    CarritoId: CarritoId
                }]
            }
        })
        if (!ProductoId || !CarritoId || !CarritoProductoCantidad) {
            msj("Debe enviar los datos completos", 200, [], res)
        } else {
            if (!buscarPr) {
                const nuevoCarritoProducto = await db.CarritoProducto.create({
                    ProductoId: ProductoId,
                    CarritoId: CarritoId,
                    CarritoProductoCantidad: CarritoProductoCantidad
                }).then((dato) => {
                    msj("Registro almacenado correctamente", 200, dato, res)
                }).catch((error) => {
                    console.log(error)
                    msj("Error al guardar los datos", 200, error, res)
                })
            } else {
                buscarPr.CarritoProductoCantidad = buscarPr.CarritoProductoCantidad + CarritoProductoCantidad
                await buscarPr.save()
                msj("Registro almacenado correctamente", 200, "", res)
            }
        }
    }
}

exports.EliminarP = async (req, res) => {
    const { ProductoId,CarritoId } = req.body
    if (!ProductoId) {
        msj("Debe enviar el identificador del producto", 500, "", res)
        return
    } else {
        const buscarProductos = db.CarritoProducto.findOne({
            where: { 
                [Op.and]: [{
                    ProductoId: ProductoId,
                    CarritoId: CarritoId
                }] 
            }
        })
        if (!buscarProductos) {
            msj("El producto no existe", 500, "", res)
            return
        } else {
            db.CarritoProducto.destroy({
                where: { 
                    [Op.and]: [{
                        ProductoId: ProductoId,
                        CarritoId: CarritoId
                    }] 
                }
            }).then((data) => {
                msj("El registro ha sido eliminado", 200, "", res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 500, [error], res)
            })
        }
    }
}
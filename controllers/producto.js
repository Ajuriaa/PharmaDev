const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')
const { productIMG } = require('./archivos')

exports.listarProductos = (req, res) => {
    db.Producto.findAll({
        include: [db.Laboratorio, db.Presentacion, {
            model: db.Inventario, required: true, where: {
                InventarioExistencia: {
                    [Op.gt]: 1
                }
            }
        }],
        order: [
            ['updatedAt', 'DESC'],
        ],
    }).then(allP => msj("Peticion procesada correctamente", 200, allP, res))
}

exports.buscarProducto = (req, res) => {
    db.Producto.findOne({
        include: [db.Laboratorio, db.Presentacion, db.Inventario],
        where: {
            Id: req.body.Id
        }
    }).then(allP => msj("Peticion procesada correctamente", 200, allP, res))
}

exports.crearProducto = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 501, validacion.array(), res)
    } else {
        await db.Producto.create({
            ProductoNombre: req.body.ProductoNombre,
            ProductoDescripcion: req.body.ProductoDescripcion,
            ProductoPrecio: req.body.ProductoPrecio,
            LaboratorioId: req.body.LaboratorioId,
            PresentacionId: req.body.PresentacionId,
        }).then(async oneP => {
            productIMG(oneP.id, req.files.photo)
            oneP.productoImagen = `http://192.168.0.2:7777/products/${oneP.id}.png`,
                await oneP.save()
            db.Inventario.create({
                ProductoId: oneP.id,
                InventarioExistencia: req.body.InventarioExistencia,
                InventarioFechaCaducidad: req.body.InventarioFechaCaducidad
            })
            res.send(msj("Registro almacenado correctamente", 200, oneP, res))
        }).catch((error) => {
            msj("Error al guardar los datos", 502, error, res)
        })
    }
}

exports.eliminarP = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        await db.Inventario.destroy({ where: { ProductoId: req.body.id } })
        await db.Producto.destroy({ where: { id: req.body.id } }).then((data) => {
            msj("El registro ha sido eliminado", 200, data, res)
            return
        }).catch((error) => {
            msj("El registro no fue eliminado, porque hay un eror en el servidor", 500, [error], res)
            return
        })
    }
}

exports.editarP = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        const findP = await db.Producto.findOne({ where: { id: req.body.id } })
        if (findP) {
            findP.ProductoNombre = req.body.ProductoNombre
            findP.ProductoDescripcion = req.body.ProductoDescripcion
            findP.ProductoPrecio = req.body.ProductoPrecio
            findP.LaboratorioId = req.body.LaboratorioId
            findP.PresentacionId = req.body.PresentacionId
            await findP.save()
            await db.Inventario.destroy({ where: { ProductoId: req.body.id } })
            db.Inventario.create({
                ProductoId: req.body.id,
                InventarioExistencia: req.body.InventarioExistencia,
                InventarioFechaCaducidad: req.body.InventarioFechaCaducidad
            })
            msj(`Registro actualizado  exitosamente.`, 200, '', res)
            return
        } {
            msj(`La Presentacion con el Identificador: ${req.body.Id} no existe.`, 500, '', res)
            return
        }
    }
}
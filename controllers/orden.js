const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

exports.generarOrden = async(req,res)=>{
    // console.log(req.body.Id)
    await db.Orden.create({
        OrdenSubtotal: req.body.OrdenSubtotal,
        OrdenDescuento: req.body.OrdenDescuento,
        OrdenImpuesto: req.body.OrdenImpuesto,
        OrdenTotal: req.body.OrdenTotal,
        UsuarioId: req.body.Id,
    }).then(async(orden) => {
        req.body.productos.forEach( async element => {
            await db.OrdenProducto.create({
                OrdenProductoCantidad: element.CarritoProductoCantidad,
                OrdenId: orden.id,
                ProductoId: element.ProductoId
            })
        });
        const oldCarrito = await db.Carrito.findOne({where:{id:req.body.productos[0].CarritoId}})
        oldCarrito.CarritoEstado = 'orden-generada'
        await oldCarrito.save()
        db.Carrito.create({
            UsuarioId: req.body.Id
        }).then((dato) => {
            const data ={
                id: dato.id,
                OrdenId: orden.id
            }
            msj("Registro almacenado correctamente", 200, data, res)
        })
    }).catch((error) => {
        msj("Error al guardar los datos", 200, error, res)
    })
    return
}
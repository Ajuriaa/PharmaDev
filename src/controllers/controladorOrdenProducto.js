const OrdenProducto = require('../models/modeloOrdenProducto')
const msj = require('../components/mensaje')
const { validationResult } = require('express-validator')

exports.listarOrdenProducto = async (req, res) => {
    const ordpro = await OrdenProducto.findAll()
    msj("Peticion procesada correctamente", 200, ordpro, res)
}

exports.GuardarOrdenProducto = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {productoId, ordenId, ordenProductoCantidad} = req.body
        if (!productoId || !ordenId || !ordenProductoCantidad) {
            res.send("Debe enviar los datos completos")
        }else{
            const nuevaOrdenProducto = await OrdenProducto.create({
                productoId: productoId,
                ordenId: ordenId,
                ordenProductoCantidad: ordenProductoCantidad
            }).then((dato)=>{
                console.log(dato)
                res.send("Registro almacenado correctamente")
            }).catch((error)=>{
                console.log(error)
                res.send("Error al guardar los datos")
            })
        }
    }
}
exports.EliminarQueryOrdenProducto = async (req, res) => {
    const { id } =  req.query
    if (!id)
    {
        res.send("Debe enviar el id de la Orden Producto!!!")
    }
    else{
        const buscarOrdenProducto = await OrdenProducto.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarOrdenProducto){
            res.send("La Orden Producto no existe!!!")
        }
        else{
            await OrdenProducto.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                console.log(data)
                res.send("El registro ha sido eliminado")
            }).catch((error) =>{
                console.log(error)
                res.send("El registro no fue eliminado, porque hay un eror en el servidor")
            })
        }
    }
}

exports.ActualizarQueryOrdenProducto = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {ordenProductoId, productoId, ordenId, ordenProductoCantidad} = req.body
        if (!ordenProductoId) {
            msj("Debe enviar el identificador del orden Producto", 200, [], res)
        } else {
            var buscarOrdenProducto = await OrdenProducto.findOne({
                where: {
                    ordenProductoId: ordenProductoId,
                }
            })
            if (!buscarOrdenProducto) {
                msj("La orden del Producto no existe", 200, ordpro, res)
            } else {
                if (!productoId || !ordenId || !ordenProductoCantidad) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarOrdenProducto.productoId=productoId
                    buscarOrdenProducto.ordenId=ordenId
                    buscarOrdenProducto.ordenProductoCantidad=ordenProductoCantidad
                    await buscarOrdenProducto.save()
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
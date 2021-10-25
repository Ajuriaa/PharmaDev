const Productos = require('../models/modeloProducto')
const msj = require('../components/mensaje')
const { validationResult } = require('express-validator')

exports.listarProductos = async (req, res) => {
    const pro = await Productos.findAll()
    msj("Peticion procesada correctamente", 200, pro, res)
}

exports.buscarProducto = async (req, res) => {
    const {busqueda} = req.body
    const pro = await Productos.findAll({
        where: {
            someAttribute: {
                [Op.like]: `%${busqueda}%`
            }
        }
    })
    msj("Peticion procesada correctamente", 200, pro, res)
}

exports.GuardarProducto = async (req, res) => {
    const validacion = validationResult(req)
    if(!validacion.isEmpty()){
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    }else{
        const {productoNombre, productoDescripcion, productoPrecio,laboratorioId, presentacionId} = req.body
        if (!productoNombre || !productoDescripcion || !productoPrecio || !laboratorioId || !presentacionId) {
            res.send("Debe enviar los datos completos")
        }else{
            const nuevoProducto = await Productos.create({
                productoNombre: productoNombre,
                productoDescripcion: productoDescripcion,
                productoPrecio: productoPrecio,
                laboratorioId: laboratorioId,
                presentacionId: presentacionId
            }).then((dato)=>{
                console.log(dato)
                res.send("Registro almacenado correctamente")
            }).catch((error)=>{
                console.log(error)
                res.send("Error al almacenar el producto")
            })
        }
    }
}
exports.EliminarQueryProducto = async (req, res) => {
    const { id } =  req.query
    if (!id)
    {
        res.send("Debe enviar el id del producto!!!")
    }
    else{
        const buscarProducto = await Producto.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarProducto){
            res.send("El Producto no existe!!!")
        }
        else{
            await Producto.destroy({
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

exports.ActualizarQueryProducto = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {productoId, productoNombre, productoDescripcion, productoPrecio, productoFechaCreado, productoFechaPublicado, productoFechaEditado, productoActivo, laboratorioId, presentacionId} = req.body
        if (!productoId) {
            msj("Debe enviar el identificador del Producto", 200, [], res)
        } else {
            var buscarProducto = await producto.findOne({
                where: {
                    productoId: productoId,
                }
            })
            if (!buscarProducto) {
                msj("El producto no existe", 200, pro, res)
            } else {
                if (!productoNombre || !productoDescripcion || !productoPrecio || !productoFechaCreado || !productoFechaPublicado || !productoFechaEditado || !productoActivo || !laboratorioId || !presentacionId) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarProducto.productoNombre = productoNombre
                    buscarProducto.productoDescripcion= productoDescripcion
                    buscarProducto.productoPrecio= productoPrecio
                    buscarProducto.productoFechaCreado = productoFechaEditado
                    buscarProducto.productoFechaPublicado = productoFechaPublicado
                    buscarProducto.productoFechaEditado = productoFechaEditado
                    buscarProducto.laboratorioId = laboratorioId
                    buscarProducto.presentacionId=presentacionId
                    await buscarProducto.save()
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
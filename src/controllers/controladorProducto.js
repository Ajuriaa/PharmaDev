const Productos = require('../models/modeloProducto')

exports.listarProductos = async (req, res) => {
    const pro = await Productos.findAll()
    console.log(pro)
    res.json(pro)
}

exports.GuardarProducto = async (req, res) => {
    const {productoNombre, productoDescripcion, productoPrecio, productoFechaCreado, productoFechaPublicado, productoFechaEditado, productoActivo, laboratorioId, presentacionId} = req.body
    if (!nombre || !descripcion || !precio || !fechaCreado || !fechaPublicado || !fechaEditado || !activo || !laboratorioId || !presentacionId) {
        res.send("Debe enviar los datos completos")
    }else{
        const nuevoProducto = await Productos.create({
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            fechaCreado: fechaCreado,
            fechaPublicado: fechaPublicado,
            fechaEditado: fechaEditado,
            activo: activo,
            laboratorioId: laboratorioId,
            ProductoId: ProductoId
        }).then((dato)=>{
            console.log(dato)
            res.send("Registro almacenado correctamente")
        }).catch((error)=>{
            console.log(error)
            res.send("Error al guardar los datos")
        })
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
    const {id} = req.query
    const {productoNombre, productoDescripcion, productoPrecio, productoFechaCreado, productoFechaPublicado, productoFechaEditado, productoActivo, laboratorioId, presentacionId} = req.body

    if (!id)
    {
        res.send("Debe enviar el id del producto")
    }
    else{
        var buscarProducto = await Producto.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarProducto){
            res.send("El producto no existe")
        }
        else{

            if (!nombre || !descripcion || !precio || !fechaCreado || !fechaPublicado || !fechaEditado || !activo || !laboratorioId || !presentacionId)
            {
                res.send("Debe enviar los datos completos")
            }
            else{
                buscarProducto.nombre=nombre
                buscarProducto.descripcion=descripcion
                buscarProducto.precio=precio
                buscarProducto.fechaCreado=fechaCreado
                buscarProducto.fechaPublicado=fechaPublicado
                buscarProducto.fechaEditado=fechaEditado
                buscarProducto.laboratorioId=laboratorioId
                buscarProducto.presentacionId=presentacionId
                await buscarProducto.save()
                console.log(buscarProducto)
                res.send("Registro actualizado")
            }
        }
    }
}
const OrdenProducto = require('../models/modeloOrdenProducto')

exports.listarOrdenProducto = async (req, res) => {
    const ordpro = await OrdenProducto.findAll()
    console.log(ordpro)
    res.json(ordpro)
}

exports.GuardarOrdenProducto = async (req, res) => {
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
    const {id} = req.query
    const {productoId, ordenId, ordenProductoCantidad} = req.body

    if (!id)
    {
        res.send("Debe enviar el id de la orden producto")
    }
    else{
        var buscarOrdenProducto = await OrdenProducto.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarOrdenProducto){
            res.send("La Orden producto no existe")
        }
        else{

            if (!productoId || !ordenId || !ordenProductoCantidad)
            {
                res.send("Debe enviar los datos completos")
            }
            else{
                buscarOrdenProducto.productoId=productoId
                buscarOrdenProducto.ordenId=ordenId
                buscarOrdenProducto.ordenProductoCantidad=ordenProductoCantidad
                await buscarOrdenProducto.save()
                console.log(buscarOrdenProducto)
                res.send("Registro actualizado")
            }
        }
    }
}
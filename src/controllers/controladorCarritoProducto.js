const CarritoProducto = require('../models/modeloCarritoProducto');

exports.listarCarritoProductos = async (req, res) => {
    const usu = await CarritoProducto.findAll();
    console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {productoId, carritoId, carritoProductoFechaAñadido, carritoProductoCantidad,carritoProductoActivo
     } = req.body;
    if (!productoId || !carritoId || !carritoProductoFechaAñadido || !carritoProductoCantidad || !carritoProductoActivo)  {
        res.send("Debe enviar los datos completos");
    }else{
        const nuevoCarritoProducto = await CarritoProducto.create({
            productoId: productoId,
            carritoId: carritoId,
            carritoProductoFechaAñadido: carritoProductoFechaAñadido,
            carritoProductoCantidad: carritoProductoCantidad,
            carritoProductoActivo: carritoProductoActivo

        }).then((dato)=>{
            console.log(dato);
            res.send("Registro almacenado correctamente");
        }).catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos");
        });
    }
};

exports.EliminarQuery = async (req, res) => {
    const { carritoProductoId } =  req.query;
    if (!carritoProductoId)
    {
        res.send("Debe enviar el Id del CarritoProducto");
    }
    else{
        const buscarCarritoProducto = await CarritoProducto.findOne({
            where: {
                carritoProductoId: carritoProductoId,
            }
        });
        if (!buscarCarritoProducto){
            res.send("El carritoProducto no existe");
        }
        else{
            await CarritoProducto.destroy({
                where: {
                    carritoProductoId: carritoProductoId,
                }
            }).then((data) => {
                console.log(data);
                res.send("El registro ha sido  eliminado");
            }).catch((error) =>{
                console.log(error);
                res.send("El registro no fue eliminado, porque hay un error en el servidor");
            });
        }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const {carritoProductoId} = req.query;
    const {productoId, carritoId,carritoProductoFechaActualizado, carritoProductoCantidad,carritoProductoActivo}=req.body;

    if (!carritoProductoId)
    {
        res.send("Debe enviar el Id del CarritoProducto");
    }
    else{
        var buscarCarritoProducto = await CarritoProducto.findOne({
            where: {
                carritoProductoId: carritoProductoId,
            }
        });
        if (!buscarCarritoProductoId){
            res.send("El CarritoProducto no existe");
        }
        else{

            if (!productoId || !carritoId || !carritoProductoFechaActualizado || !carritoProductoCantidad || !carritoProductoActivo)
            {
                res.send("Debe enviar los datos completos");
            }
            else{
                buscarCarritoProducto.productoId=productoId;
                buscarCarritoProducto.carritoId=carritoId,
                buscarCarritoProducto.carritoProductoFechaActualizado=carritoProductoFechaActualizado,
                buscarCarritoProducto.carritoProductoCantidad=carritoProductoCantidad,
                buscarCarritoProducto.carritoProductoActivo=carritoProductoActivo,
                await buscarCarritoProducto.save();
                console.log(buscarCarritoProducto);
                res.send("Registro actualizado");
            }
        }
    }
};






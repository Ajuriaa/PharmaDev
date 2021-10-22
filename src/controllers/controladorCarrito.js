const Carrito = require('../models/modeloCarrito');

exports.listarCarritos = async (req, res) => {
    const usu = await Carrito.findAll();
    console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {carritoCreadoEl, carritoEstado, usuarioId
     } = req.body;
    if (!carritoCreadoEl || !carritoEstado|| !usuarioId) {
        res.send("Debe enviar los datos completos");
    }else{
        const nuevoCarrito = await Carrito.create({
            carritoCreadoEl: carritoCreadoEl,
            carritoEstado: carritoEstado,
            usuarioId: usuarioId
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
    const { carritoId } =  req.query;
    if (!carritoId)
    {
        res.send("Debe enviar el Id del Carrito");
    }
    else{
        const buscarCarrito = await Carrito.findOne({
            where: {
                carritoId: carritoId,
            }
        });
        if (!buscarCarrito){
            res.send("El Carrito no existe");
        }
        else{
            await Carrito.destroy({
                where: {
                    carritoId: carritoId,
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
    const {carritoId} = req.query;
    const {carritoActualizadoEl, carritoEstado, usuarioId}=req.body;

    if (!carritoId)
    {
        res.send("Debe enviar el Id del Carrito");
    }
    else{
        var buscarCarrito = await Carrito.findOne({
            where: {
                carritoId: carritoId,
            }
        });
        if (!buscarCarrito){
            res.send("El Carrito no existe");
        }
        else{

            if (!usuarioId || !carritoActualizadoEl || !carritoEstado)
            {
                res.send("Debe enviar los datos completos");
            }
            else{
                buscarCarrito.carritoActualizadoEl=carritoActualizadoEl;
                buscarCarrito.carritoEstado=carritoEstado;
                buscarCarrito.usuarioId=usuarioId
                await buscarCarrito.save();
                console.log(buscarCarrito);
                res.send("Registro actualizado");
            }
        }
    }
};

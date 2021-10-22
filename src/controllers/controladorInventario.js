const Inventario = require('../models/modeloInventario');

exports.listarInventarios = async (req, res) => {
    const usu = await Inventario.findAll();
    console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {inventarioExistencia, inventarioFechaCaducidad, productoId
     } = req.body;
    if (!inventarioExistencia || !inventarioFechaCaducidad|| !productoId) {
        res.send("Debe enviar los datos completos");
    }else{
        const nuevoInventario = await Inventario.create({
            inventarioExistencia: inventarioExistencia,
            inventarioFechaCaducidad: inventarioFechaCaducidad,
            productoId: productoId
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
    const { inventarioId } =  req.query;
    if (!inventarioId)
    {
        res.send("Debe enviar el Id del Inventario");
    }
    else{
        const buscarInventario = await Inventario.findOne({
            where: {
                inventarioId: inventarioId,
            }
        });
        if (!buscarInventario){
            res.send("El Inventario no existe");
        }
        else{
            await Inventario.destroy({
                where: {
                    inventarioId: inventarioId,
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
    const {inventarioId} = req.query;
    const {inventarioExistencia, inventarioFechaCaducidad, productoId}=req.body;

    if (!inventarioId)
    {
        res.send("Debe enviar el Id del Inventario");
    }
    else{
        var buscarInventario = await Inventario.findOne({
            where: {
                inventarioId: inventarioId,
            }
        });
        if (!buscarInventario){
            res.send("El Inventario no existe");
        }
        else{

            if (!inventarioExistencia || !inventarioFechaCaducidad|| !productoId) 
            {
                res.send("Debe enviar los datos completos");
            }
            else{
                buscarInventario.inventarioExistencia=inventarioExistencia;
                buscarInventario.inventarioFechaCaducidad=inventarioFechaCaducidad;
                buscarInventario.productoId=productoId
                await buscarInventario.save();
                console.log(buscarInventario);
                res.send("Registro actualizado");
            }
        }
    }
};

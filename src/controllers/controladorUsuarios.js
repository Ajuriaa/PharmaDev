const Usuario = require('../models/modeloUsuario');

exports.listarUsuarios = async (req, res) => {
    const usu = await Usuario.findAll();
    console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {usuarioNombre, usuarioTelefono, usuario } = req.body;
    if (!nombre || !contraseña || !activo) {
        res.send("Debe enviar los datos completos");
    }else{
        const nuevoUsuario = await Usuario.create({
            nombre: nombre,
            contraseña: contraseña,
            activo: activo
        }).then((dato)=>{
            console.log(dato);
            res.send("Registro almacenado correctamente");
        }).catch((error)=>{
            console.log(error);
            res.send("Error al guardar los datos");
        });
    }
};

exports.EliminarParams = async (req, res) => {
    const { id } =  req.params;
    if (!id)
    {
        res.send("Debe enviar el id del usuario");
    }
    else{
        const buscarUsuario = await Usuario.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarUsuario){
            res.send("El usuario no existe");
        }
        else{
            await Usuario.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                console.log(data);
                res.send("El registro ha sido eliminado");
            }).catch((error) =>{
                console.log(error);
                res.send("El registro no fue eliminado, porque hay un eror en el servidor");
            });
        }
    }
};

exports.EliminarQuery = async (req, res) => {
    const { id } =  req.query;
    if (!id)
    {
        res.send("Debe enviar el id del usuario");
    }
    else{
        const buscarUsuario = await Usuario.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarUsuario){
            res.send("El usuario no existe");
        }
        else{
            await Usuario.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                console.log(data);
                res.send("El registro ha sido eliminado");
            }).catch((error) =>{
                console.log(error);
                res.send("El registro no fue eliminado, porque hay un eror en el servidor");
            });
        }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const {id} = req.query;
    const {nombre, contraseña, activo}=req.body;

    if (!id)
    {
        res.send("Debe enviar el id del usuario");
    }
    else{
        var buscarUsuario = await Usuario.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarUsuario){
            res.send("El usuario no existe");
        }
        else{

            if (!nombre || !contraseña )
            {
                res.send("Debe enviar los datos completos");
            }
            else{
                buscarUsuario.nombre=nombre;
                buscarUsuario.contraseña=contraseña;
                buscarUsuario.activo=activo;
                await buscarUsuario.save();
                console.log(buscarUsuario);
                res.send("Registro actualizado");
            }
        }
    }
};

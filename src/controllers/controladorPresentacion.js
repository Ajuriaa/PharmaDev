const Presentacion = require('../models/modeloPresentacion')

exports.listarPresentaciones = async (req, res) => {
    const pre = await Presentacion.findAll()
    console.log(pre)
    res.json(pre)
}

exports.GuardarPresentacion = async (req, res) => {
    const {presentacionNombre, presentacionDescripcion} = req.body
    if (!nombre || !descripcion) {
        res.send("Debe enviar los datos completos")
    }else{
        const nuevaPresentacion = await Presentacion.create({
            nombre: nombre,
            descripcion: descripcion
        }).then((dato)=>{
            console.log(dato)
            res.send("Registro almacenado correctamente")
        }).catch((error)=>{
            console.log(error)
            res.send("Error al guardar los datos")
        })
    }
}
exports.EliminarQueryPresentacion = async (req, res) => {
    const { id } =  req.query
    if (!id)
    {
        res.send("Debe enviar el id de la presentacion!!!")
    }
    else{
        const buscarPresentacion = await Presentacion.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarPresentacion){
            res.send("La Presentacion no existe!!!")
        }
        else{
            await Presentacion.destroy({
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

exports.ActualizarQueryPresentacion = async (req, res) => {
    const {id} = req.query
    const {nombre, descripcion}=req.body

    if (!id)
    {
        res.send("Debe enviar el id de la presentacion")
    }
    else{
        var buscarPresentacion = await Presentacion.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarPresentacion){
            res.send("La Presentacion no existe")
        }
        else{

            if (!nombre || !descripcion)
            {
                res.send("Debe enviar los datos completos")
            }
            else{
                buscarPresentacion.nombre=nombre
                buscarPresentacion.descripcion=descripcion
                await buscarPresentacion.save()
                console.log(buscarPresentacion)
                res.send("Registro actualizado")
            }
        }
    }
}
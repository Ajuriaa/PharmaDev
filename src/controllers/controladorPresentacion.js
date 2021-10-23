const Presentacion = require('../models/modeloPresentacion')
const msj = require('../components/mensaje')
const { validationResult } = require('express-validator')

exports.listarPresentaciones = async (req, res) => {
    const pre = await Presentacion.findAll()
    msj("Peticion procesada correctamente", 200, pre, res)
}

exports.GuardarPresentacion = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {presentacionNombre, presentacionDescripcion} = req.body
        if (!presentacionNombre || !presentacionDescripcion) {
            res.send("Debe enviar los datos completos")
        }else{
            const nuevaPresentacion = await Presentacion.create({
                presentacionNombre: presentacionNombre,
                presentacionDescripcion: presentacionDescripcion
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
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {presentacionId, presentacionNombre, presentacionDescripcion}=req.body
        if (!presentacionId) {
            msj("Debe enviar el identificador del Presentacion", 200, [], res)
        } else {
            var buscarPresentacion = await Presentacion.findOne({
                where: {
                    presentacionId: presentacionId,
                }
            })
            if (!buscarPresentacion) {
                msj("La Presentacion no existe", 200, pre, res)
            } else {
                if (!presentacionNombre || !presentacionDescripcion) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarPresentacion.presentacionNombre = presentacionNombre
                    buscarPresentacion.presentacionDescripcion = presentacionDescripcion
                    await buscarPresentacion.save()
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
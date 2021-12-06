const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

exports.findL =async(req, res) => {
    const laboratorios = await db.Laboratorio.findAll()
    msj("Peticion procesada correctamente", 200, laboratorios, res)
    return
}

exports.findOneL = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
        return
    } else {
        db.Laboratorio.findOne({ where: { Id: req.body.Id } }).then(allL => {
            if (allL){
                res.send(msj("Peticion procesada correctamente", 200, allL, res))
                return
            } 
            else{
                res.send(msj(`El laboratorio con el Identificador: ${req.body.Id} no existe.`, 500, allL, res))
                return
            }
                
        })
        return
    }
}

exports.addL = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
        return
    } else {
        db.Laboratorio.create({
            LaboratorioNombre: req.body.LaboratorioNombre,
            LaboratorioDescripcion: req.body.LaboratorioDescripcion
        }).then(oneL => res.send(msj("Registro almacenado correctamente", 200, oneL, res)))
            .catch((error) => {
                msj("Error al guardar los datos", 500, error, res)
            })
        return
    }
}

exports.delL = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        const findL = db.Laboratorio.findAll({ where: { Id: req.body.Id } })
        if (findL) {
            db.Laboratorio.destroy({ where: { Id: req.body.Id } }).then((data) => {
                msj("El registro ha sido eliminado", 200, data, res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 500, [error], res)
            })
            return
        } {
            msj(`El laboratorio con el Identificador: ${req.body.Id} no existe.`, 500, '', res)
            return
        }
    }
}

exports.updateL = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        const findL = await db.Laboratorio.findOne({ where: { Id: req.body.Id } })
        if (findL) {
            findL.LaboratorioNombre = req.body.LaboratorioNombre
            findL.LaboratorioDescripcion = req.body.LaboratorioDescripcion
            await findL.save()
            msj(`Registro actualizado  exitosamente.`, 200, '', res)
            return
        } {
            msj(`El laboratorio con el Identificador: ${req.body.Id} no existe.`, 500, '', res)
            return
        }
    }
}
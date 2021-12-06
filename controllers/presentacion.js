const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

exports.findP = (req, res) => {
    db.Presentacion.findAll().then(allP => msj("Peticion procesada correctamente", 200, allP, res))
    return
}

exports.findOneP = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        db.Presentacion.findOne({ where: { Id: req.body.Id } }).then(allP =>{
            if(allP)
                res.send(msj("Peticion procesada correctamente", 200, allP, res))
            else
            res.send(msj(`La Presentacion con el Identificador: ${req.body.Id} no existe.`, 500, allP, res))
        })
    }
}

exports.addP = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        db.Presentacion.create({
            PresentacionNombre: req.body.PresentacionNombre,
            PresentacionDescripcion: req.body.PresentacionDescripcion
        }).then(oneP => res.send(msj("Registro almacenado correctamente", 200, oneP, res)))
            .catch((error) => {
                msj("Error al guardar los datos", 500, error, res)
            })
    }
}

exports.delP = (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        const findP = db.Presentacion.findAll({ where: { Id: req.body.Id } })
        if (findP) {
            db.Presentacion.destroy({ where: { Id: req.body.Id } }).then((data) => {
                msj("El registro ha sido eliminado", 200, data, res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 500, [error], res)
            })
            return
        } {
            msj(`La Presentacion con el Identificador: ${req.body.Id} no existe.`, 500, '', res)
            return
        }
    }
}

exports.updateP = async (req,res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 501, validacion.array(), res)
    } else {
        const findP = await db.Presentacion.findOne({ where: { Id: req.body.Id } })
        if (findP) {
            findP.PresentacionNombre = req.body.PresentacionNombre
            findP.PresentacionDescripcion = req.body.PresentacionDescripcion
            await findP.save()
            msj(`Registro actualizado  exitosamente.`, 200, '', res)
            return
        } {
            msj(`La Presentacion con el Identificador: ${req.body.Id} no existe.`, 502, '', res)
            return
        }
    }
}
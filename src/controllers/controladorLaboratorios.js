const Laboratorio = require('../models/modeloLaboratorio')
const msj = require('../components/mensaje')
const {
    validationResult
} = require('express-validator')

exports.listarLaboratorios = async (req, res) => {
    const usu = await Laboratorio.findAll()
    msj("Peticion procesada correctamente", 200, usu, res)
}

exports.Guardar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            laboratorioNombre,
            laboratorioDescripcion
        } = req.body
        if (!laboratorioNombre || !laboratorioDescripcion) {
            res.send("Debe enviar los datos completos")
        } else {
            const nuevoLaboratorio = await Laboratorio.create({
                laboratorioNombre: laboratorioNombre,
                laboratorioDescripcion: laboratorioDescripcion
            }).then((dato) => {
                msj("Registro almacenado correctamente", 200, dato, res)

            }).catch((error) => {
                msj("Error al guardar los datos", 200, error, res)
            })
        }
    }
}

exports.Eliminar = async (req, res) => {
    const {
        laboratorioId
    } = req.body
    if (!laboratorioId) {
        res.send("Debe enviar el identificador del Laboratorio")
    } else {
        const buscarLaboratorio = await Laboratorio.findOne({
            where: {
                laboratorioId: laboratorioId,
            }
        })
        if (!buscarLaboratorio) {
            msj("El Laboratorio no existe", 200, [], res)
        } else {
            await Laboratorio.destroy({
                where: {
                    laboratorioId: laboratorioId,
                }
            }).then((data) => {
                msj("El registro ha sido eliminado", 200, data, res)
            }).catch((error) => {
                msj("El registro no fue eliminado, porque hay un eror en el servidor", 200, error, res)
            })
        }
    }
}

exports.Actualizar = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res)
    } else {
        const {
            laboratorioId,
            laboratorioNombre,
            laboratorioDescripcion
        } = req.body
        if (!laboratorioId) {
            msj("Debe enviar el identificador del Laboratorio", 200, [], res)
        } else {
            var buscarLaboratorio = await Laboratorio.findOne({
                where: {
                    laboratorioId: laboratorioId,
                }
            })
            if (!buscarLaboratorio) {
                msj("El Laboratorio no existe", 200, usu, res)
            } else {
                if (!laboratorioNombre || !laboratorioDescripcion) {
                    msj("Debe enviar los datos completos", 200, [], res)
                } else {
                    buscarLaboratorio.laboratorioNombre = laboratorioNombre
                    buscarLaboratorio.laboratorioDescripcion = laboratorioDescripcion
                    await buscarLaboratorio.save()
                    msj("Registro actualizado", 200, [], res)
                }
            }
        }
    }
}
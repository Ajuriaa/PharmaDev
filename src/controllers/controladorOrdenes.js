const Orden = require('../models/modeloOrden');

exports.listarOrdenes = async (req, res) => {
    const usu = await Orden.findAll();
    // console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {
        usuarioId,
        ordenEstado,
        ordenSubtotal,
        ordenDescuento,
        ordenImpuestos,
        ordenTotal,
        ordenCreadoEl
    } = req.body;
    if (!usuarioId ||!ordenEstado || !ordenSubtotal || !ordenDescuento || !ordenImpuestos || !ordenTotal || !ordenCreadoEl) {
        res.send("Debe enviar los datos completos");
    } else {
        const nuevoOrden = await Orden.create({
            usuarioId: usuarioId,
            ordenEstado: ordenEstado,
            ordenSubtotal: ordenSubtotal,
            ordenDescuento: ordenDescuento,
            ordenImpuesto: ordenImpuesto,
            ordenTotal: ordenTotal,
            ordenCreadoEl: ordenCreadoEl
        }).then((dato) => {
            console.log(dato);
            res.send("Registro almacenado correctamente");
        }).catch((error) => {
            console.log(error);
            res.send("Error al guardar los datos");
        });
    }
};

exports.EliminarQuery = async (req, res) => {
    const {
        ordenId
    } = req.query;
    if (!ordenId) {
        res.send("Debe enviar el identificador de la Orden");
    } else {
        const buscarOrden = await Orden.findOne({
            where: {
                ordenId: ordenId,
            }
        });
        if (!buscarOrden) {
            res.send("La Orden no existe");
        } else {
            await Orden.destroy({
                where: {
                    ordenId: ordenId,
                }
            }).then((data) => {
                console.log(data);
                res.send("El registro ha sido eliminado");
            }).catch((error) => {
                console.log(error);
                res.send("El registro no fue eliminado, porque hay un eror en el servidor");
            });
        }
    }
};

exports.ActualizarQuery = async (req, res) => {
    const {
        ordenId
    } = req.query;
    const {
        usuarioId,
        ordenEstado,
        ordenSubtotal,
        ordenDescuento,
        ordenImpuestos,
        ordenTotal,
        ordenCreadoEl,
        ordenActualizadoEl
    } = req.body;

    if (!ordenId) {
        res.send("Debe enviar el numero de identidad del Orden");
    } else {
        var buscarOrden = await Orden.findOne({
            where: {
                ordenId: ordenId,
            }
        });
        if (!buscarOrden) {
            res.send("El Orden no existe");
        } else {

            if (!usuarioId ||!ordenEstado || !ordenSubtotal || !ordenDescuento || !ordenImpuestos || !ordenTotal || !ordenActualizadoEl) {
                res.send("Debe enviar los datos completos");
            } else {
                buscarOrden.usuarioId = usuarioId;
                buscarOrden.ordenEstado = ordenEstado;
                buscarOrden.ordenSubtotal = ordenSubtotal;
                buscarOrden.ordenDescuento = ordenDescuento;
                buscarOrden.ordenImpuestos = ordenImpuestos;
                buscarOrden.ordenTotal = ordenTotal;
                buscarOrden.ordenActualizadoEl = ordenActualizadoEl;
                await buscarOrden.save();
                console.log(buscarOrden);
                res.send("Registro actualizado");
            }
        }
    }
};
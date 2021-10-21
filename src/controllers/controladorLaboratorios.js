const Laboratorio = require('../models/modeloLaboratorio');

exports.listarLaboratorios = async (req, res) => {
    const usu = await Laboratorio.findAll();
    // console.log(usu);
    res.json(usu);
};

exports.Guardar = async (req, res) => {
    const {
        laboratorioNombre,
        laboratorioDescripcion
    } = req.body;
    if (!laboratorioNombre || !laboratorioDescripcion) {
        res.send("Debe enviar los datos completos");
    } else {
        const nuevoLaboratorio = await Laboratorio.create({
            laboratorioNombre: laboratorioNombre,
            laboratorioDescripcion: laboratorioDescripcion
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
        laboratorioId
    } = req.query;
    if (!laboratorioId) {
        res.send("Debe enviar el identificador del Laboratorio");
    } else {
        const buscarLaboratorio = await Laboratorio.findOne({
            where: {
                laboratorioId: laboratorioId,
            }
        });
        if (!buscarLaboratorio) {
            res.send("El Laboratorio no existe");
        } else {
            await Laboratorio.destroy({
                where: {
                    laboratorioId: laboratorioId,
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
        laboratorioId
    } = req.query;
    const {
        laboratorioNombre,
        laboratorioDescripcion
    } = req.body;

    if (!laboratorioId) {
        res.send("Debe enviar el identificador del Laboratorio");
    } else {
        var buscarLaboratorio = await Laboratorio.findOne({
            where: {
                laboratorioId: laboratorioId,
            }
        });
        if (!buscarLaboratorio) {
            res.send("El Laboratorio no existe");
        } else {

            if (!laboratorioNombre || !laboratorioDescripcion) {
                res.send("Debe enviar los datos completos");
            } else {
                buscarLaboratorio.laboratorioNombre = laboratorioNombre;
                buscarLaboratorio.laboratorioDescripcion = laboratorioDescripcion;
                await buscarLaboratorio.save();
                console.log(buscarLaboratorio);
                res.send("Registro actualizado");
            }
        }
    }
};
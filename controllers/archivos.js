const { validationResult } = require('express-validator')
const fileUpload = require('express-fileupload');
const msj = require('../components/mensaje')

// Subir imagen de usuario
exports.profileIMG = async (req, res) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        msj("Los datos ingresados no son validos", 500, validacion.array(), res)
    } else {
        let photo;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.send(msj("No subió ningún archivo", 500, "", res));
        }
        photo = req.files.photo;
        photo.name = req.body.Id + '.png' || "error.png"
        uploadPath = process.cwd() + '/public/users/' + photo.name;
        photo.mv(uploadPath, function (err) {
            if (err)
                return res.send(msj("Ocurrió un error", 500, err, res));
            res.send(msj("Archivo subido", 200, { uri: 'http:192.168.0.2:7777/users/' + photo.name }, res));
        });
    }
}

exports.productIMG = async (id, img) => {
    let uploadPath;
    img.name = id + '.png'
    uploadPath = process.cwd() + '/public/products/' + img.name;
    img.mv(uploadPath, function (err) {
        if (err)
            return "Ocurrió un error"
        else
            return "Archivo subido"
    });
}
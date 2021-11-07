const findImgs = (id) => {
    const fs = require('fs');
    const contents = fs.readFileSync(`uploads/product/${id}.png`, { encoding: 'base64' });
    let data = [{
        productoId: {
            productoId: id,
            productoImagen: contents
        }
    }
    ]
    return data
}
module.exports = findImgs
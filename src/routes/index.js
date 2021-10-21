const { Router } = require('express');
const router = Router();
router.get('/', (req, res) => {
    const api = {
        titulo: "API Movil II",
        autor: "Carlos Flores"
    }
    res.json(api);
});
//CONFIGURACION "Esta es la ruta de configuracion"
//EMPLEADO (ID, NOMBRE, APELLIDO, CARGO, SUELDO)
//PRODUCTO (ID, NOMBRE, DESCRIPCION, PRECIO, COSTO, EXISTENCIA)
module.exports = router;
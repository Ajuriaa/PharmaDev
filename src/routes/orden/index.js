const { Router } = require('express');
const router = Router();
const controladoOrdenes = require('../../controllers/controladorOrdenes');
router.get('/', controladoOrdenes.listarOrdenes);
router.post('/', controladoOrdenes.Guardar);
router.delete('/', controladoOrdenes.EliminarQuery);
router.put('/', controladoOrdenes.ActualizarQuery);
module.exports = router;
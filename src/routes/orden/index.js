const { Router } = require('express');
const router = Router();
const controladoOrdenes = require('../../controllers/contraladoOrdenes');
router.get('/', controladoOrdenes.listaOrdenes);
router.post('/', controladoOrdenes.Guardar);
router.delete('/', controladoOrdenes.EliminarQuery);
router.put('/', controladoOrdenes.ActualizarQuery);
module.exports = router;
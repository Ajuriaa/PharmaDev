const { Router } = require('express')
const router = Router()
const controladorOrdenProducto = require('../../controllers/controladorOrdenProducto')
router.get('/', controladorOrdenProducto.listarOrdenProducto)
router.post('/', controladorOrdenProducto.GuardarOrdenProducto)
router.delete('/', controladorOrdenProducto.EliminarQueryOrdenProducto)
router.put('/', controladorOrdenProducto.ActualizarQueryOrdenProducto)
module.exports = router
const { Router } = require('express')
const { body } = require('express-validator')
const { validarAutenticado } = require('../controllers/autenticacion')
const { findP, findOneP, addP, delP, updateP } = require('../controllers/presentacion')
const router = Router()

router.get('/allP', validarAutenticado, findP)
router.post('/oneP', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador de la Presentacion')
    , findOneP)
router.post('/addP', validarAutenticado,
    body('PresentacionNombre').isLength({
        min: 1
    }).withMessage("Debe enviar el nombre de la Presentacion"),
    addP
)
router.delete('/delP', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador de la Presentacion')
    , delP)

router.put('/updateP', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador de la Presentacion'),
    body('PresentacionNombre').isLength({
        min: 1
    }).withMessage("Debe enviar el nombre de la Presentacion"),
    updateP)

module.exports = router
const { Router } = require('express')
const { body } = require('express-validator')
const { validarAutenticado } = require('../controllers/autenticacion')
const { findL, findOneL, addL, delL, updateL } = require('../controllers/laboratorio')
const router = Router()

router.get('/allL', validarAutenticado, findL)
router.post('/oneL', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador del laboratorio')
    , findOneL)
router.post('/addL', validarAutenticado,
    body('LaboratorioNombre').isLength({
        min: 1
    }).withMessage("Debe enviar el nombre del laboratorio"),
    addL
)
router.delete('/delL', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador del laboratorio')
    , delL)

router.put('/updateL', validarAutenticado,
    body('Id').isLength({ min: 1 }).withMessage('Debe enviar el identificador del laboratorio'),
    body('LaboratorioNombre').isLength({
        min: 1
    }).withMessage("Debe enviar el nombre del laboratorio"),
    updateL)

module.exports = router
const { Router } = require('express')
const router = Router()
router.get('/', (req, res) => {
    const api = {
        titulo: "PharmaDev API",
        autores: {
            "Autor1":"Maryury Lissbeth Peralta Gutiérrez",
            "Autor2":"José Alejandro Ajuria Aguilar",
            "Autor3":"Lener Jersan Quiroz Herrera",
        }
    }
    res.json(api)
})
module.exports = router
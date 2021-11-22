const msj = require('../components/mensaje')
const db = require('../models')
const { validationResult } = require('express-validator')
const { Op } = require('sequelize')

exports.listarProductos = (req, res) => {
    db.Producto.findAll({
        include: [db.Laboratorio, db.Presentacion,db.Inventario]
    }).then(allP => msj("Peticion procesada correctamente", 200, allP, res))
}

exports.buscarProducto = (req, res) => {
    db.Producto.findOne({
        include: [db.Laboratorio, db.Presentacion,db.Inventario],
        where:{
            Id: req.body.Id
        }
    }).then(allP => msj("Peticion procesada correctamente", 200, allP, res))
}
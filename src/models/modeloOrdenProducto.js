const sequelize = require('sequelize')
const db = require('../config/db')
const OrdenProducto = db.define(
    "OrdenProducto",
    {
        ordenProductoId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        productoId: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        ordenId: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        ordenProductoCantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "OrdenProducto",
        modelName: "OrdenProducto",
        timestamps: false,
    }
)
module.exports = OrdenProducto

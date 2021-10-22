const sequelize = require('sequelize')
const db = require('../config/db.js')
const Inventario = db.define(
    "Inventario",{
        inventarioId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        inventarioExistencia:{
            type: sequelize.FLOAT
        },
        inventarioFechaCaducidad:{
            type: sequelize.DATE
        },
        productoId:{
            type: sequelize.INTEGER
        }
    },{
        sequelize,
        modelName: "Inventario",
        tableName: "Inventario",
        timestamps: false,
    }
)
module.exports = Inventario

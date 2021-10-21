const sequelize = require('sequelize');
const db = require('../config/db.js')
const CarritoProducto = db.define(
    "CarritoProducto",{
        carritoProductoId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productoId:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        carritoId:{
            type: sequelize.INTEGER
        },
        carritoProductoFechaAñadido:{
            type: sequelize.DATE
        },
        carritoProductoFechaActualizado:{
            type: sequelize.DATE
        },
        carritoProductoCantidad:{
            type: sequelize.INTEGER
        },
        carritoProductoActivo:{
            type: sequelize.TINYINT
        },
    },{
        sequelize,
        modelName: "CarritoProducto",
        tableName: "CarritoProducto",
        timestamps: false,
    }
);
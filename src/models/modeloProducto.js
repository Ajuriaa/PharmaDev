const sequelize = require('sequelize')
const db = require('../config/db.js')
const Producto = db.define(
    "Producto",{
        productoId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productoNombre:{
            type: sequelize.STRING(25),
            allowNull: false
        },
        productoDescripcion:{
            type: sequelize.STRING(250),
        },
        productoPrecio:{
            type: sequelize.FLOAT,
            allowNull: false
        },
        productoFechaCreado:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        productoFechaPublicado:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        productoFechaEditado:{
            type: sequelize.DATE
        },
        productoActivo:{
            type: sequelize.BOOLEAN,
            defaultValue: true
        },
        laboratorioId:{
            type: sequelize.INTEGER,
        },
        presentacionId:{
            type: sequelize.INTEGER,
        },
        productoImagen:{
            type: sequelize.STRING,
        }
    },{
        sequelize,
        modelName: "Producto",
        tableName: "Producto",
        timestamps: false,
    }
)
module.exports = Producto
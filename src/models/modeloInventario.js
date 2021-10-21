const sequelize = require('sequelize');
const db = require('../config/db.js')
const Carrito = db.define(
    "Inventario",{
        inventarioId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        inventariosExistencias:{
            type: sequelize.FLOAT,
            defaultValue: sequelize.NOW
        },
        inventarioFechaCaducidad:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        productoId:{
            type: sequelize.INTEGER,
            references:{
                model: Producto,
                key: 'productoId',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        sequelize,
        modelName: "Inventario",
        tableName: "Inventario",
        timestamps: false,
    }
);
module.exports = Inventario;

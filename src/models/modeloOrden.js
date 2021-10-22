const sequelize = require('sequelize');
const db = require('../config/db');
const Orden = db.define(
    "Orden",
    {
        ordenId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuarioId: {
            type: sequelize.STRING(13),
            allowNull: false,
        },
        ordenEstado: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        ordenSubtotal: {
            type: sequelize.FLOAT,
            allowNull: false,
        },
        ordenDescuento: {
            type: sequelize.FLOAT,
            allowNull: false,
        },
        ordenImpuesto: {
            type: sequelize.FLOAT,
            allowNull: false,
        },
        ordenTotal: {
            type: sequelize.FLOAT,
            allowNull: false,
        },
        ordenCreadoEl: {
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        ordenActualizadoEl: {
            type: sequelize.DATE,
        },
    },
    {
        tableName: "Orden",
        modelName: "Orden",
        timestamps: false,
        hooks: {
            beforeUpdate(Orden){
                Orden.ordenActualizadoEl = sequelize.NOW
            }
        }
    }
);
module.exports = Orden;

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
            type: sequelize.INTEGER,
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
            allowNull: false,
        },
        ordenActualizadoEl: {
            type: sequelize.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "Orden",
        modelName: "Orden",
        timestamps: false,
    }
);
module.exports = Orden;

const sequelize = require('sequelize');
const db = require('../config/db.js')
const Carrito = db.define(
    "Laboratorio",{
        laboratorioId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        laboratorioNombre:{
            type: sequelize.STRING(50),
            defaultValue: sequelize.NOW
        },
        laboratorioDescripcion:{
            type: sequelize.STRING(50),
            defaultValue: sequelize.NOW
        },

    },{
        sequelize,
        modelName: "Laboratorio",
        tableName: "Laboratorio",
        timestamps: false,
    }
);
module.exports = Laboratorio;

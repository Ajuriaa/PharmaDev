const sequelize = require('sequelize');
const db = require('../config/db.js')
const Laboratorio = db.define(
    "Laboratorio",{
        laboratorioId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        laboratorioNombre:{
            type: sequelize.STRING(50)
        },
        laboratorioDescripcion:{
            type: sequelize.STRING(50)
        },
    },{
        sequelize,
        modelName: "Laboratorio",
        tableName: "Laboratorio",
        timestamps: false,
    }
);
module.exports = Laboratorio;

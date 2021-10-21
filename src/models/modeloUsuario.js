const sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = db.define(
    "Usuario",
    {
        usuarioId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usuarioNombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        usuarioTelefono: {
            type: sequelize.STRING(50),
        },
        usuarioCorreo: {
            type: sequelize.STRING(50),
        },
        usuarioContraseña: {
            type: sequelize.STRING(50),
        },
        usuarioAdmin: {
            type: sequelize.TINYINT,
        },
        usuarioRegistradoEl: {
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        usuarioUltimoLog: {
            type: sequelize.DATE,
        },
    },
    {
        tableName: "Usuario",
        modelName: "Usuario",
        timestamps: false,
    }
);
module.exports = Usuario;

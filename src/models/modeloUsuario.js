const sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = db.define(
    "Usuario",
    {
        usuarioId: {
            type: sequelize.STRING(13),
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
        usuarioContrasena: {
            type: sequelize.STRING(50),
        },
        usuarioDireccion: {
            type: sequelize.STRING(100),
        },
        usuarioFechaNacimiento: {
            type: sequelize.DATE,
        },
        usuarioSexo: {
            type: sequelize.STRING(1),
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

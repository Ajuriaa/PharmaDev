const sequelize = require('sequelize');
const db = require('../config/db.js')
const Carrito = db.define(
    "Carrito",{
        carritoId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        carritoCreadoEl:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        carritoActualizadoEl:{
            type: sequelize.DATE,
            defaultValue: sequelize.NOW
        },
        carritoEstado:{
            type: sequelize.STRING
        },
        usuarioId:{
            type: sequelize.INTEGER,
            references:{
                model: Usuario,
                key: 'usuarioId',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        sequelize,
        modelName: "Carrito",
        tableName: "Carrito",
        timestamps: false,
    }
);
module.exports = Carrito;
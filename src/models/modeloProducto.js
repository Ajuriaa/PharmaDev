const sequelize = require('sequelize');
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
            type: sequelize.DATE
        },
        productoFechaEditado:{
            type: sequelize.DATE
        },
        productoActivo:{
            type: sequelize.BOOLEAN,
            allowNull: false
        },
        laboratorioId:{
            type: sequelize.INTEGER,
            references:{
                model: Laboratorio,
                key: 'laboratorioId',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        presentacionId:{
            type: sequelize.INTEGER,
            references:{
                model: Presentacion,
                key: 'presentacionId',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    },{
        sequelize,
        modelName: "Producto",
        tableName: "Producto",
        timestamps: false,
    }
);
module.exports = Producto;
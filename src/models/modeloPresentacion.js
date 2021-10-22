const sequelize = require('sequelize')
const db = require('../config/db.js')
const Presentacion = db.define(
    "Presentacion",{
        presentacionId:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        presentacionNombre:{
            type: sequelize.STRING(25),
            allowNull: false
        },
        presentacionDescripcion:{
            type: sequelize.STRING(250),

        }
    },{
        sequelize,
        modelName: "Presentacion",
        tableName: "Presentacion",
        timestamps: false,
    }
)
module.exports = Presentacion
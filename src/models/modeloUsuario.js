const sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcrypt')
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
            validate: {
                notEmpty: {
                    msg: 'Ingrese un nombre'
                }
            }
        },
        usuarioTelefono: {
            type: sequelize.STRING(50),
        },
        usuarioCorreo: {
            type: sequelize.STRING(50),
            unique: {
                msg:  'El email necesita ser unico'
            },
            validate: {
                isEmail: {
                    msg: 'Email no valido'
                },
                notEmpty: {
                    msg: 'Ingrese un email'
                }
            }
        },
        usuarioContrasena: {
            type: sequelize.STRING(50),
            validate: {
                notEmpty: {
                    msg: 'Ingrese una contraseña'
                }
            }
        },
        usuarioDireccion: {
            type: sequelize.STRING(100),
        },
        usuarioFechaNacimiento: {
            type: sequelize.DATE,
            validate: {
                notEmpty: {
                    msg: 'Ingrese una fecha de nacimiento'
                }
            }
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
        hooks: {
            beforeCreate(Usuario){
                const hash = bcrypt.hashSync(Usuario.usuarioContrasena,10)
                Usuario.usuarioContrasena = hash
            },
            beforeUpdate(Usuario){
                const hash = bcrypt.hashSync(Usuario.usuarioContrasena,10)
                Usuario.usuarioContrasena = hash
            }
        }

    }
)
Usuario.prototype.verificarContrasena = (con, com) =>{
    return bcrypt.compareSync(con, com)
}
module.exports = Usuario

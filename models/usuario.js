const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        Id: {
            type: DataTypes.STRING(13),
            primaryKey: true,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [13, 13]
            }
        },
        usuarioNombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        usuarioTelefono: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                isNumeric: true,
                len: [8, 8]
            }
        },
        usuarioCorreo: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                isEmail: true
            }
        },
        usuarioContrasena: {
            type: DataTypes.STRING(100)
        },
        usuarioDireccion: {
            type: DataTypes.STRING(100),
        },
        usuarioFechaNacimiento: {
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        usuarioSexo: {
            type: DataTypes.STRING(1),
        },
        usuarioAdmin: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        usuarioRegistradoEl: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        usuarioUltimoLog: {
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })

    Usuario.associate = models => {
        Usuario.hasMany(models.Carrito, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
        Usuario.hasMany(models.Orden, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }
    return Usuario
}
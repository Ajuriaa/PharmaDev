module.exports = (sequelize, DataTypes) => {
    const Presentacion = sequelize.define("Presentacion", {
        PresentacionNombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        PresentacionDescripcion:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    Presentacion.associate = models => {
        Presentacion.hasMany(models.Producto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }

    return Presentacion
}
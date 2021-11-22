module.exports = (sequelize, DataTypes) => {
    const Carrito = sequelize.define("Carrito", {
        CarritoEstado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'actual'
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })

    Carrito.associate = models => {
        Carrito.belongsTo(models.Usuario, {
            foreignKey: {
                allowNull: false
            }
        })
        Carrito.hasMany(models.CarritoProducto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }

    return Carrito
}
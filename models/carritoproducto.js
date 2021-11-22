module.exports = (sequelize, DataTypes) => {
    const CarritoProducto = sequelize.define("CarritoProducto", {
        CarritoProductoCantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })

    CarritoProducto.associate = models => {
        CarritoProducto.belongsTo(models.Carrito, {
            foreignKey: {
                allowNull: false
            }
        })
        CarritoProducto.belongsTo(models.Producto, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return CarritoProducto
}
module.exports = (sequelize, DataTypes) => {
    const OrdenProducto = sequelize.define("OrdenProducto", {
        OrdenProductoCantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    OrdenProducto.associate = models => {
        OrdenProducto.belongsTo(models.Orden, {
            foreignKey: {
                allowNull: false
            }
        })
        OrdenProducto.belongsTo(models.Producto, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return OrdenProducto
}
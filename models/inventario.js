module.exports = (sequelize, DataTypes) => {
    const Inventario = sequelize.define("Inventario", {
        InventarioExistencia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        InventarioFechaCaducidad:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    Inventario.associate = models => {
        Inventario.belongsTo(models.Producto, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Inventario
}
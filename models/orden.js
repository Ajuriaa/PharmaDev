module.exports = (sequelize, DataTypes) => {
    const Orden = sequelize.define("Orden", {
        OrdenEstado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendiente'
        },
        OrdenSubtotal:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        OrdenDescuento:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        OrdenImpuesto:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        OrdenTotal:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        

    }, {
        freezeTableName: true,
        timestamps: true
    })

    Orden.associate = models => {
        Orden.belongsTo(models.Usuario, {
            foreignKey: {
                allowNull: false
            }
        })
        Orden.hasMany(models.OrdenProducto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }

    return Orden
}
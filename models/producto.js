module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define("Producto", {
        ProductoNombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ProductoDescripcion:{
            type: DataTypes.STRING,
            allowNull: true
        },
        ProductoPrecio:{
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                isNumeric: true
            }
        },
        productoActivo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        productoImagen: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true,
        timestamps: true
    })

    Producto.associate = models => {
        Producto.belongsTo(models.Laboratorio, {
            foreignKey: {
                allowNull: false
            }
        })
        Producto.belongsTo(models.Presentacion, {
            foreignKey: {
                allowNull: false
            }
        })
        Producto.hasMany(models.Inventario, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
        Producto.hasMany(models.CarritoProducto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
        Producto.hasMany(models.OrdenProducto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }

    return Producto
}
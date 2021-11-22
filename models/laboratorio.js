module.exports = (sequelize, DataTypes) => {
    const Laboratorio = sequelize.define("Laboratorio", {
        LaboratorioNombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        LaboratorioDescripcion:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    Laboratorio.associate = models => {
        Laboratorio.hasMany(models.Producto, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    }

    return Laboratorio
}
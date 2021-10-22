const sequelize = require('sequelize')
const db = new sequelize(
    'pharmadev',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
    }
)
module.exports= db
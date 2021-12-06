const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require("passport")
const app = express();
const db = require('./models');

app.use(fileUpload());

require('dotenv').config()
// Puerto
const PORT = 7777;

// Configuraciones base
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use('/', express.static(__dirname + '/public'));

// Rutas
app.use('/api/usuario/', require('./routes/usuario'))
app.use('/api/producto/', require('./routes/producto'))
app.use('/api/autenticacion/', require('./routes/autenticacion'))
app.use('/api/carritoproducto/', require('./routes/carritoproducto'))
app.use('/api/laboratorio/', require('./routes/laboratorio'))
app.use('/api/presentacion/', require('./routes/presentacion'))
app.use('/api/orden/', require('./routes/orden'))

// Iniciar el server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening at: http://localhost:${PORT}`)
    })
})

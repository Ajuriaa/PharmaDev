const express = require('express');
const morgan = require('morgan');
const rutasUsuarios = require('./routes/usuarios/index');
const rutasEmpleados = require('./routes/empleados/index');
const rutasCargos = require('./routes/cargos/index');
const app = express();
app.set('port', 3101);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(3101, () => {
    console.log('Servidor iniciado en el puerto 3101');
});

//rutas
app.use('/api/',require('./routes/index'));
app.use('/api/usuario/', rutasUsuarios);
app.use('/api/empleado/', rutasEmpleados);
app.use('/api/cargo/', rutasCargos);

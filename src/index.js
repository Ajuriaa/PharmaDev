const express = require('express');
const morgan = require('morgan');
const rutasUsuarios = require('./routes/usuarios/index');
const rutasCarrito = require('./routes/carrito/index');
const rutascarritoProducto = require('./routes/carritoProducto/index');
const rutasInventario= require('./routes/inventario/index');
const rutasLaboratorio = require('./routes/laboratorio/index');
const rutasOrden = require('./routes/orden/index');
const rutasPresentacion= require('./routes/presentacion/index');
const rutasOrdenProducto = require('./routes/ordenProdcuto/index');
const rutasProductos= require('./routes/productos/index');
const rutasPresentacion = require('./models/modeloPresentacion');

const app = express();
app.set('port', 7777);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(7777, () => {
    console.log('Servidor iniciado en el puerto 7777');
});

//rutas
app.use('/api/',require('./routes/index'));
app.use('/api/usuario/', rutasUsuarios);
app.use('/api/carrito/', rutasCarrito);
app.use('/api/carritoProducto/', rutascarritoProducto);
app.use('/api/inventario/', rutasInventario);
app.use('/api/laboratorio/', rutasLaboratorio);
app.use('/api/orden/', rutasOrden);
app.use('/api/ordenProducto/', rutasOrdenProducto);
app.use('/api/productos/', rutasProductos);
app.use('/api/presentacion/', rutasPresentacion);




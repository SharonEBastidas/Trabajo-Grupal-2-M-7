const express = require('express');
const cookieParser = require('cookie-parser');
const { conectToBD, sequelize } = require('./config/db');

const app = express();
const port = 8000;

// Conectar a la base de datos
conectToBD();

sequelize.sync().then(() => {
    console.log('Modelos sincronizados con la base de datos.');
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//rutas
const usuarioRoute = require('./routes/usuarioRoute');
const productoRoute = require('./routes/productoRoute');
const categoriaRoute = require('./routes/categoriaRoute');

const apiRoute = require('./routes/apiRoute');

//rutas funcionalidades
app.use('/admin/usuarios', usuarioRoute);
app.use('/admin/productos', productoRoute);
app.use('/admin/categorias', categoriaRoute);

// ruta API
app.use('/api', apiRoute);

//motor de vistas
app.set('view engine', 'pug');
app.set('views', './views');

//ruta de inicio
app.get('/', (req, res) => {
    res.render('index', { title: 'Ecommerce '});
});


require('dotenv').config();
app.listen(port, () => {
    console.log(`Servidor iniciado en https://localhost:${port}`);
})
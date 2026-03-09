const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');

// Importar rutas
const usuariosRouter = require('./routes/usuariosRoutes');
const productosRouter = require('./routes/productosRoutes');
const carritoRouter = require('./routes/carritoRoutes');

const app = express();

// Configuración de handlebars
app.engine('hbs', hbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);


// Vistas principales
app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/catalogo', (req, res) => res.redirect('catalogo'));
app.get('/carrito', (req, res) => res.render('carrito'));
app.get('/contacto', (req, res) => res.render('contacto'));

// 404
app.get('/*', (req, res) => {
  res.status(404).render('error', { estilos: 'error.css' });
});

module.exports = app;

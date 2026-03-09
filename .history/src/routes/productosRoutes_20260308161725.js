
// Improtamos express y el router
const { Router } = require('express');
const router = Router();

// Importamos el controlador de productos para mostrar el formulario de productos
const { 
    dameFormulario,
    guardarProducto,
    listarProductos
} = require('../controllers/productosController');


// Rutas de productos: responden a /api/productos..

//1. Ruta para mostrar el formulario de productos
router.get('/dameFormulario', dameFormulario);

//2. Ruta para procesar el formulario de productos
router.post('/guardarProducto', guardarProducto);

//3. Ruta para listar los productos guardados en la base de datos
router.get('/listarProductos', listarProductos);



// Exportar el router
module.exports = router;










// const { Router } = require('express');
// const router = Router();

// const {
//   listarProductos,
//   obtenerProducto,
//   guardarProducto,
//   actualizarProducto,
//   eliminarProducto,
//   dameFormulario,
//   vistaProductos
// } = require('../controllers/productosController');

// // Rutas de Vista (HTML)
// router.get('/catalogo', vistaProductos);
// router.get('/dameFormulario', dameFormulario);
// router.post('/guardarProducto', guardarProducto);

// // Rutas API REST CRUD
// router.get('/', listarProductos);           // GET /api/productos
// router.get('/:id', obtenerProducto);        // GET /api/productos/:id
// router.post('/', guardarProducto);          // POST /api/productos
// router.put('/:id', actualizarProducto);     // PUT /api/productos/:id
// router.delete('/:id', eliminarProducto);    // DELETE /api/productos/:id

// module.exports = router;

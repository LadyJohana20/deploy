const { Router } = require('express');
const router = Router();

const {
  listarProductos,
  obtenerProducto,
  guardarProducto,
  actualizarProducto,
  eliminarProducto,
  dameFormulario,
  vistaProductos
} = require('../controllers/productosController');

// Rutas de Vista (HTML)
router.get('/catalogo', vistaProductos);
router.get('/dameFormulario', dameFormulario);
router.post('/guardarProducto', guardarProducto);

// Rutas API REST CRUD
router.get('/', listarProductos);           // GET /api/productos
router.get('/:id', obtenerProducto);        // GET /api/productos/:id
router.post('/', guardarProducto);          // POST /api/productos
router.put('/:id', actualizarProducto);     // PUT /api/productos/:id
router.delete('/:id', eliminarProducto);    // DELETE /api/productos/:id

module.exports = router;

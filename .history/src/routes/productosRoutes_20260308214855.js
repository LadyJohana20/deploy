
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
router.post('https://deploy-production-1017.up.railway.app/api/productos/guardarProducto', guardarProducto);

//3. Ruta para listar los productos guardados en la base de datos
router.get('https://deploy-production-1017.up.railway.app/api/productos/listarProductos', listarProductos);



// Exportar el router
module.exports = router;









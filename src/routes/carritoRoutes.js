const { Router } = require('express');
const router = Router();

const { guardarCarrito, listarPedidos } = require('../controllers/carritoController');

router.post('/', guardarCarrito);     // POST /api/carrito
router.get('/', listarPedidos);       // GET /api/carrito (admin)

module.exports = router;

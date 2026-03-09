// Improtamos express y el router
const { Router } = require('express');
const router = Router();

// Importamos el controlador de productos para mostrar el formulario de productos
const { 
    dameConsulta,
    guardarConsulta,
    listarConsultas
} = require('../controllers/consultaController');


// Rutas de consulta: responden a /api/consultas..

//1. Ruta para mostrar el formulario de consultas
router.get('/dameConsulta', dameConsulta);

//2. Ruta para procesar el formulario de consultas
router.post('/guardarConsulta', guardarConsulta);

//3. Ruta para listar las consultas guardadas en la base de datos
router.get('/listarConsultas', listarConsultas);



// Exportar el router
module.exports = router;


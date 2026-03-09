
// Librerias
const dotenv = require('dotenv')
dotenv.config();

// Importar el servidor
const app = require('./app');

// Levantar el servidor
const PORT = process.env.PORT || 8080;

// 1. Conexión a MongoDB Atlas
// Importar la función de conexión a MongoDB
const conexionMongo = require('./database/conexionAtlas');

// Establecer la conexión a MongoDB antes de iniciar el servidor
conexionMongo();


// 2. Conexión a MongoDB local
// Importar la función de conexión a MongoDB local
//const conexionMongoLocal = require('./database/conexionLocal');
// Establecer la conexión a MongoDB local antes de iniciar el servidor
//conexionMongoLocal();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto https://deploy-production-1017.up.railway.app/:${PORT}`);
});


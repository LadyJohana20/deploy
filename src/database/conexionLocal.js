
// 1. Importar mongoose para obtener la función de conexión a MongoDB
const mongoose = require('mongoose');

// 2. Importar dotenv para cargar las variables de entorno
const dotenv = require('dotenv');
dotenv.config();

// 3. Uri de conexión a MongoDB local
const uri = "mongodb://localhost:27017/ecommerce";



const conexionMongoLocal = async () => {

  mongoose.connect(uri).then(
    () => { 
      console.log("Conexión a MongoDB local establecida");
    },
    err => { 
      console.error("Error al conectar a MongoDB local:", err);
    }
  );

}

module.exports = conexionMongoLocal;
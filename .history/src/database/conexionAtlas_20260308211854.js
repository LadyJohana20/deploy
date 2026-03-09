




// 1. Importar mongoose para obtener la función de conexión a MongoDB
const mongoose = require('mongoose');

// 2. Importar dotenv para cargar las variables de entorno
const dotenv = require('dotenv');
dotenv.config();


// 3. Obtener la URI de conexión desde las variables de entorno
const uri = process.env.MONGO_URI || process.env.DATABASE_URL || `mongodb+srv://ladyjohana20:${process.env.MONGO_PASSWORD}@cluster0.c54kzc6.mongodb.net/ecommerce?appName=Cluster0`;

const clientOptions = { 
  serverApi: 
  { version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};
const clientOptions = { 
  serverApi: 
  { version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

// 5. Crear una función asíncrona para establecer la conexión a MongoDB
async function conexionMongo() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = conexionMongo;




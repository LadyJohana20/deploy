




// 1. Importar mongoose para obtener la función de conexión a MongoDB
const mongoose = require('mongoose');

// 2. Importar dotenv para cargar las variables de entorno
const dotenv = require('dotenv');
dotenv.config();


// 3. Obtener la contraseña de MongoDB desde las variables de entorno
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

// 4. Construir la URI de conexión a MongoDB utilizando la contraseña
const uri = `mongodb+srv://ladyjohana20:${MONGO_PASSWORD}@cluster0.c54kzc6.mongodb.net/ecommerce?appName=Cluster0`;
//mongodb+srv://ladyjohana20:<db_password>@cluster0.c54kzc6.mongodb.net/?appName=Cluster0
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




// const mongoose = require('mongoose');
// const dotenv = require('dotenv')
// dotenv.config();

// const MONGO_PASSWORD = process.env.MONGO_PASSWORD;


// const uri = `mongodb+srv://ladyjohana20:${MONGO_PASSWORD}@cluster0.c54kzc6.mongodb.net/?appName=Cluster0`;


// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(" You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// run().catch(console.dir);


//1. Importar Mongoose
const mongoose = require('mongoose');

//2. Definir el esquema del modelo
const consultaSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    trim: true,
    min: 2,
  },
    email: {
    type: String,
    required: true,
    unique: true
  },
    mensaje: {
    type: String,
    required: true
  },
    
    dataRegistro:{
        type: Date,
        default: Date.now
    }
});


//3. Exportar el modelo
module.exports = mongoose.model('consulta', consultaSchema);

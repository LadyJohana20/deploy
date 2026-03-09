

//1. Importar Mongoose
const mongoose = require('mongoose');

//2. Definir el esquema del modelo
const productoSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    trim: true,
    min: 2,
  },
    precio: {
    type: Number,
    required: true,
    min: 0,
  },
    descripcion: {
    type: String,
    required: true
  },
    imagen: {
    type: String,
    required: true
  },
    dataRegistro:{
        type: Date,
        default: Date.now
    }
});


//3. Exportar el modelo
module.exports = mongoose.model('producto', productoSchema);









// const mongoose = require('mongoose');
// const productoSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 2,
//   },
//   precio: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   descripcion: {
//     type: String,
//     required: true
//   },
//   imagen: {
//     type: String,
//     required: true
//   },
//   categoria: {
//     type: String,
//     enum: ['carpas', 'parasoles', 'accesorios', 'otros'],
//     default: 'otros'
//   },
//   stock: {
//     type: Number,
//     default: 0,
//     min: 0
//   },
//   dataRegistro: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('producto', productoSchema);

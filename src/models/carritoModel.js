const mongoose = require('mongoose');

const itemCarritoSchema = new mongoose.Schema({
  productoId: { type: String, required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true, min: 1 },
  imagen: { type: String }
});

const carritoSchema = new mongoose.Schema({
  items: [itemCarritoSchema],
  total: { type: Number, required: true },
  fechaPedido: { type: Date, default: Date.now },
  estado: { type: String, default: 'pendiente', enum: ['pendiente', 'procesando', 'completado', 'cancelado'] }
});

module.exports = mongoose.model('carrito', carritoSchema);

const CarritoModel = require('../models/carritoModel');

module.exports = {

  // POST /api/carrito - Recibir pedido del frontend
  guardarCarrito: async (req, res) => {
    try {
      const { items, total } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío o tiene un formato inválido' });
      }

      // Mostrar en consola el pedido recibido
      console.log('\n====================================');
      console.log('🛒 NUEVO PEDIDO RECIBIDO - Carpas El Fuerte');
      console.log('====================================');
      console.log('Fecha:', new Date().toLocaleString('es-AR'));
      console.log('Items del carrito:');
      items.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item.nombre} - Cantidad: ${item.cantidad} - Precio unitario: $${item.precio}`);
      });
      console.log(`TOTAL: $${total}`);
      console.log('====================================\n');

      // Guardar en base de datos
      const nuevoPedido = new CarritoModel({ items, total });
      await nuevoPedido.save();

      res.status(201).json({
        message: 'Pedido recibido correctamente. ¡Gracias por elegir Carpas El Fuerte!',
        pedidoId: nuevoPedido._id
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar el carrito', error: error.message });
    }
  },

  // GET /api/carrito - Listar todos los pedidos (admin)
  listarPedidos: async (req, res) => {
    try {
      const pedidos = await CarritoModel.find().sort({ fechaPedido: -1 });
      res.json({ message: 'Pedidos obtenidos correctamente', data: pedidos });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  }

};

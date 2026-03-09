const ProductoModel = require('../models/productosModel');

module.exports = {

  // GET /api/productos - Listar todos los productos
  listarProductos: async (req, res) => {
    try {
      const productos = await ProductoModel.find();
      res.json({ message: 'Productos obtenidos correctamente', data: productos });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  },

  // GET /api/productos/:id - Obtener un producto por ID
  obtenerProducto: async (req, res) => {
    try {
      const producto = await ProductoModel.findById(req.params.id);
      if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto obtenido correctamente', data: producto });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
  },

  // POST /api/productos - Crear un nuevo producto
  guardarProducto: async (req, res) => {
    try {
      const nuevoProducto = new ProductoModel({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        categoria: req.body.categoria || 'otros',
        stock: req.body.stock || 0
      });
      await nuevoProducto.save();
      // Si es petición API (JSON) responde JSON, si es form responde vista
      if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        res.status(201).json({ message: 'Producto creado correctamente', data: nuevoProducto });
      } else {
        res.render('exitoProducto', { nombre: nuevoProducto.nombre });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar el producto', error: error.message });
    }
  },

  // PUT /api/productos/:id - Actualizar un producto
  actualizarProducto: async (req, res) => {
    try {
      const productoActualizado = await ProductoModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!productoActualizado) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado correctamente', data: productoActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  },

  // DELETE /api/productos/:id - Eliminar un producto
  eliminarProducto: async (req, res) => {
    try {
      const productoEliminado = await ProductoModel.findByIdAndDelete(req.params.id);
      if (!productoEliminado) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto eliminado correctamente', data: productoEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  },

  // Vista: formulario para agregar producto
  dameFormulario: (req, res) => {
    res.render('formProductos');
  },

  // Vista: listar productos en HTML
  vistaProductos: async (req, res) => {
    try {
      const productos = await ProductoModel.find();
      res.render('productos', { productos: productos.map(p => p.toObject()) });
    } catch (error) {
      res.status(500).render('error', { mensaje: 'Error al cargar los productos' });
    }
  }

};

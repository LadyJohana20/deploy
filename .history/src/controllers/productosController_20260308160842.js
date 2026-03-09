const ProductoModel = require('../models/productosModel');

module.exports = {

   // Vista: formulario para agregar producto
  dameFormulario: (req, res) => {
    res.render('formProductos');const ProductoModel = require('../models/productosModel');

// Modelo cpn un Objeto literal que exporta dos funciones: dameFormulario y guardarProducto
// Exportar el controlador
module.exports = {

  // renderiza el formulario de productos
  dameFormulario: (req, res) => {
    res.render('formProductos');
},

  guardarProducto: async (req, res) => {
  // Aquí se implementaría la lógica para guardar el producto en la base de datos, utilizando los datos recibidos en req.body

  //Desestructuramos los datos recibidos en el cuerpo de la petición
  const nuevoProducto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen
  };

  // Creamos una nueva instancia del modelo Producto con los datos recibidos
  const crearProducto = new ProductoModel(nuevoProducto);

  // Guardamos el producto en la base de datos
  try {
    await crearProducto.save();

    res.render('exitoProducto');

  } catch (error) {
    res.status(500).json({
      message: 'Error al guardar el producto',
      error: error.message
    });
  }

/*   res.json({
    message: 'Producto guardado correctamente',
    data: req.body
  }); */
  },

  // función para listar los productos guardados en la base de datos
  listarProductos: async (req, res) => {

    try{

      const arrayProductos = await ProductoModel.find();

      console.log(arrayProductos);

      res.json({
        message: 'Productos listados correctamente',
        data: arrayProductos
      });
      

    }catch(error){

      res.status(500).json({
      message: 'Error al guardar el producto',
      error: error.message
    });

    }

  }
  
};


// Ejemplo de un objeto literal que exporta dos funciones: dameFormulario y guardarProducto
// no lo usamos en el backend, es solo un ejemplo de cómo se puede exportar un objeto literal con funciones
const persona ={
  nombre: 'Bernardo',
  edad: 30
}
  },

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

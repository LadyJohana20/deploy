const ProductoModel = require('../models/productosModel');

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
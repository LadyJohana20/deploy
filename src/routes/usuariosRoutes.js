
// Improtamos express y el router
const { Router } = require('express');
const router = Router();

// Importamos el modelo de usuario para poder guardar los datos en la base de datos
const UsuarioCollection = require('../models/usuariosModel');


// Esta ruta responde a /api/usuarios..

// Rutas de usuarios
//1. Ruta para mostrar el formulario de registro
router.get('/registro', (req, res) => {
    res.render('registro');
});

//2. Ruta para procesar el formulario de registro
router.post('/registro', (req, res)=>{

  //1. Recibimos los datos del formulario
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirm_password;


  // Desestructuración de objetos para extraer solo las propiedades que nos interesan (en este caso, el nombre y el email, pero no la contraseña)
  //const {nombre, email, password, confirmPassword} = req.body; 

  //2. Creamos un objeto con los datos recibidos (en una aplicación real, aquí iría la lógica para guardar el usuario en la base de datos)
  const persona = {
    nombre,
    email,
    password
  }

  // Otra forma de crear el objeto, utilizando la sintaxis de propiedad abreviada (shorthand) para las propiedades que tienen el mismo nombre que las variables
  const otraPersona = {
    nombre: nombre,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  }

  // Otra forma de crear el objeto,utilizando directamente el objeto req.body, que contiene los datos enviados en el formulario (en una aplicación real, se debería validar y sanitizar estos datos antes de utilizarlos)

  const otraData = {
    nombre : req.body.nombre,
    email : req.body.email,
    password : req.body.password,
    confirmPassword : req.body.confirm_password
  }


  //! Aquí usamos el modelo usuario para guadar el dato = documento en la base de datos
  // todo lo que tiene que ver con bases de datos, lo hacemos con funciones asíncronas, porque las operaciones con bases de datos pueden tardar un tiempo en completarse, y no queremos bloquear el servidor mientras esperamos la respuesta de la base de datos. Para esto, utilizamos async/await o promesas.
  
  // Creamos una función asíncrona para guardar el usuario en la base de datos
  const guardarUsuario = async () => {
    // probabamos y capturamos errores con try/catch, para evitar que el servidor se caiga si ocurre un error al guardar el usuario en la base de datos (por ejemplo, si el email ya existe, o si hay un error de conexión a la base de datos)
    try {

      // Creamos una instancia del modelo de usuario con los datos recibidos
      const usuarioNuevo = new UsuarioCollection(persona);

      // Guardamos el usuario en la base de datos
      await usuarioNuevo.save();

    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }

  }

  // invocamos la función para guardar el usuario en la base de datos
  guardarUsuario();


  //3. Respondemos con un mensaje de éxito y los datos recibidos (en una aplicación real, no se debería enviar la contraseña en la respuesta)
  res.json({
    message: 'Datos recibidos correctamente',
    persona,
    otraPersona,
    otraData
  });

});



// Exportamos el router
module.exports = router;
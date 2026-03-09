module.exports = {

   // Vista: formulario para agregar producto
  dameConsulta: (req, res) => {
    res.render('contacto');
  },

  // GET /api/contacto - Listar todos los productos
  listarcontacto: async (req, res) => {
    try {
      const contacto = await contactoModel.find();
      res.json({ message: 'Contacto obtenidos correctamente', data: contacto });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener contacto', error: error.message });
    }
  },

  // GET /api/contacto/:id - Obtener un producto por ID
  obtenerContacto: async (req, res) => {
    try {
      const contacto = await contactoModel.findById(req.params.id);
      if (!contacto) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.json({ message: 'Contacto obtenido correctamente', data: contacto });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el contacto', error: error.message });
    }
  },

  // POST /api/contacto - Crear un nuevo contacto
  guardarContacto: async (req, res) => {
    try {
      const nuevoContacto = new contactoModel({
        nombre: req.body.nombre,
        email: req.body.email,
        mensaje: req.body.mensaje
      });
      await nuevoContacto.save();
      // Si es petición API (JSON) responde JSON, si es form responde vista
      if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
        res.status(201).json({ message: 'Contacto creado correctamente', data: nuevoContacto });
      } else {
        res.render('exitoContacto', { nombre: nuevoContacto.nombre });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al guardar el contacto', error: error.message });
    }
  },

  // PUT /api/contacto/:id - Actualizar un contacto
  actualizarContacto: async (req, res) => {
    try {
      const contactoActualizado = await contactoModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      if (!contactoActualizado) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.json({ message: 'Contacto actualizado correctamente', data: contactoActualizado });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el contacto', error: error.message });
    }
  },

  // DELETE /api/contacto/:id - Eliminar un contacto
  eliminarContacto: async (req, res) => {
    try {
      const contactoEliminado = await contactoModel.findByIdAndDelete(req.params.id);
      if (!contactoEliminado) return res.status(404).json({ message: 'Contacto no encontrado' });
      res.json({ message: 'Contacto eliminado correctamente', data: contactoEliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el contacto', error: error.message });
    }
  },

 

  // Vista: listar contacto en HTML
  vistaContacto: async (req, res) => {
    try {
      const contacto = await contactoModel.find();
      res.render('contacto', { contacto: contacto.map(c => c.toObject()) });
    } catch (error) {
      res.status(500).render('error', { mensaje: 'Error al cargar los contacto' });
    }
  }

};

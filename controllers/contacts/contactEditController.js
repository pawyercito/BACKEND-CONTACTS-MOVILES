// controllers/contactModifyController.js
const Contact = require('../../models/Contact');

exports.modifyContact = async (req, res) => {
    try {
      // Obtener el ID del contacto de los parámetros de la URL
      const { id } = req.params;
      // Buscar el contacto en la base de datos por su ID
      const contact = await Contact.findById(id);
      // Verificar si el contacto existe
      if (!contact) {
        return res.status(404).json({ msg: 'Contacto no encontrado' });
      }
      // Verificar si el usuario autenticado es el propietario del contacto
      if (contact.userId.toString()!== req.user._id.toString()) {
        return res.status(403).json({ msg: 'No tienes permiso para modificar este contacto' });
      }
      // Actualizar el contacto con los datos del cuerpo de la solicitud
      Object.assign(contact, req.body);
      // Guardar los cambios en la base de datos
      await contact.save();
      // Enviar el contacto actualizado como respuesta
      res.json({ msg: 'Contacto actualizado exitosamente', contact });
    } catch (error) {
      // En caso de error, enviar una respuesta con un mensaje de error
      console.error(error);
      res.status(500).json({ msg: 'Error al actualizar el contacto' });
    }
  };
// controllers/contactViewController.js
const Contact = require('../../models/Contact');
const { findContactById } = require('./contactUtils');


exports.viewContact = async (req, res) => {
  try {
    // Obtener el ID del contacto de los parámetros de la URL
    const { id } = req.params;
    // Buscar el contacto en la base de datos por su ID
    const contact = await findContactById(id);
    // Verificar si el contacto existe
    if (!contact) {
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    }
    // Verificar si el usuario autenticado es el propietario del contacto
    if (contact.userId.toString()!== req.user._id.toString()) {
      return res.status(403).json({ msg: 'No tienes permiso para ver este contacto' });
    }
    // Enviar el contacto como respuesta
    res.json(contact);
  } catch (error) {
    // En caso de error, enviar una respuesta con un mensaje de error
    console.error(error);
    res.status(500).json({ msg: 'Error al buscar el contacto' });
  }
};
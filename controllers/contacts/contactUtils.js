const Contact = require('../../models/Contact');

exports.findContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error('Contacto no encontrado');
    }
    return contact;
  } catch (error) {
    throw new Error('Error al buscar el contacto');
  }
};
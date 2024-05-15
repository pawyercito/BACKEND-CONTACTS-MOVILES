// controllers/groupContactRemoveController.js

const Group = require('../../models/Group');
const Contact = require('../../models/Contact');

exports.removeContactFromGroup = async (req, res) => {
  try {
    // Obtener el ID del grupo y el ID del contacto de los parámetros de la URL
    const { groupId, contactId } = req.params;

    // Buscar el grupo en la base de datos por su ID
    const group = await Group.findById(groupId);

    // Verificar si el grupo existe
    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado' });
    }

    // Buscar el contacto en la base de datos por su ID
    const contact = await Contact.findById(contactId);

    // Verificar si el contacto existe
    if (!contact) {
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    }

    // Verificar si el contacto ya ha sido eliminado (fuera del grupo)
    const groupContact = group.contacts.id(contactId);
    if (!groupContact) {
      return res.status(400).json({ msg: 'El contacto ya no pertenece al grupo' });
    }

    // Remover el contacto de la lista de contactos del grupo
    group.contacts.pull(contactId);
    await group.save();

    // Enviar una respuesta con un mensaje de éxito
    res.json({ msg: 'Contacto removido exitosamente del grupo' });
  } catch (error) {
    // En caso de error, enviar una respuesta con un mensaje de error
    console.error(error);
    res.status(500).json({ msg: 'Error al remover el contacto del grupo' });
  }
};
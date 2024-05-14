// controllers/contactListController.js
const Contact = require('../../models/Contact');

exports.listContacts = async (req, res) => {
    try {
      // Buscar todos los contactos del usuario autenticado y ordenarlos alfabéticamente por nombre
      const contacts = await Contact.find({ userId: req.user._id }).sort({ name: 1 });
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener los contactos' });
    }
  };
  
// controllers/contactCreateController.js
const Contact = require('../../models/Contact');

exports.createContact = async (req, res) => {
  try {
    // Verificar si ya existe un contacto con el mismo nombre y número de teléfono para el mismo usuario
    const existingContact = await Contact.findOne({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      userId: req.user._id
    });

    if (existingContact) {
      return res.status(400).json({ msg: 'Este contacto ya existe.' });
    }

    // Si no existe, crear un nuevo contacto con los datos del cuerpo de la solicitud y el userId del usuario autenticado
    const newContact = new Contact({...req.body, userId: req.user._id });
    await newContact.save();
    res.status(201).json({ msg: 'Contacto creado exitosamente', contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el contacto' });
  }
};
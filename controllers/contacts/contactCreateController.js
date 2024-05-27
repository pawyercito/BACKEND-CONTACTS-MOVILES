// controllers/contactCreateController.js
const Contact = require('../../models/Contact');

exports.createContact = async (req, res) => {
  try {
    // Verificar si ya existe un contacto con algún número de teléfono duplicado para el mismo usuario
    const existingContacts = await Contact.find({
      userId: req.user._id,
      'phoneNumbers.number': { $in: req.body.phoneNumbers.map(phoneNumber => phoneNumber.number) }
    }).lean(); // Usamos lean() para evitar la serialización completa de Mongoose

    if (existingContacts.length > 0) {
      return res.status(400).json({ msg: 'Existen números de teléfono duplicados.' });
    }

    // Si no existen números de teléfono duplicados, crear un nuevo contacto con los datos del cuerpo de la solicitud y el userId del usuario autenticado
    const newContact = new Contact(req.body);
    newContact.userId = req.user._id; // Agregar el userId del usuario autenticado
    await newContact.save();
    res.status(201).json({ msg: 'Contacto creado exitosamente', contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el contacto' });
  }
};

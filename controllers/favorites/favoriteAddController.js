const Favorite = require('../../models/Favorite');
const { findContactById } = require('../../controllers/contacts/contactUtils');

exports.addFavorite = async (req, res) => {
  try {
    const { userId, contactId } = req.body;
    
    // Verificar si el contacto ya está en la lista de favoritos
    const existingFavorite = await Favorite.findOne({ userId, contactId });
    if (existingFavorite) {
      return res.status(400).json({ msg: 'Este contacto ya está en la lista de favoritos' });
    }

    const contact = await findContactById(contactId);
    const favorite = new Favorite({ userId, contactId });

    await favorite.save();

    res.status(201).json({
      msg: `${contact.name} ${contact.lastName} ha sido agregado a favoritos exitosamente`,
      data: favorite
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al agregar el contacto a favoritos', error: error.message });
  }
};
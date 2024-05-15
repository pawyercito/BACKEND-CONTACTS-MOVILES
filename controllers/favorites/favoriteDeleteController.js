const Favorite = require('../../models/Favorite');
const { findContactById } = require('../../controllers/contacts/contactUtils');

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, contactId } = req.body;
    
    // Verificar si el contacto está en la lista de favoritos antes de intentar eliminarlo
    const existingFavorite = await Favorite.findOne({ userId, contactId });
    if (!existingFavorite) {
      return res.status(404).json({ msg: 'Este contacto no está en la lista de favoritos' });
    }

    // Obtener los detalles del contacto para incluirlos en la respuesta
    const contact = await findContactById(contactId);
    const { name, lastName } = contact;

    await Favorite.deleteOne({ userId, contactId });
    res.status(200).json({
      msg: `${name} ${lastName} ha sido removido de favoritos exitosamente`,
      data: existingFavorite
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al remover el contacto de favoritos', error: error.message });
  }
};
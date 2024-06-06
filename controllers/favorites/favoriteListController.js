// controllers/favorites/favoriteListController.js
const Favorite = require('../../models/Favorite');

exports.listFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Usuario autenticado:", userId); // Depuración del ID del usuario

    const favoriteContacts = await Favorite.find({ userId: userId })
     .populate('contactId')
     .exec();

    console.log("Favoritos encontrados:", favoriteContacts); // Depuración de los favoritos encontrados

    const contacts = favoriteContacts.map(contact => contact.contactId);
    console.log("IDs de contactos:", contacts); // Depuración de los IDs de contactos

    res.json(contacts);
  } catch (error) {
    console.error("Error al listar los contactos favoritos:", error); // Impresión completa del error
    res.status(500).json({ msg: 'Error al listar los contactos favoritos' });
  }
};
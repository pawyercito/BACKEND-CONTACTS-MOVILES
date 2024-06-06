const Favorite = require('../../models/Favorite');
const { findContactById } = require('../../controllers/contacts/contactUtils');

exports.addFavorites = async (req, res) => {
  try {
    const { userId, contactIds } = req.body; // Asumiendo que ahora contactIds es un array

    // Iterar sobre cada ID de contacto
    for (const contactId of contactIds) {
      // Verificar si el contacto ya está en la lista de favoritos
      const existingFavorite = await Favorite.findOne({ userId, contactId });
      if (existingFavorite) {
        continue; // Si ya existe, continuar con el siguiente contacto
      }

      const contact = await findContactById(contactId); // Asegúrate de que esta función maneje correctamente los casos donde el contacto no se encuentra
      const favorite = new Favorite({ userId, contactId });

      await favorite.save();
    }

    res.status(201).json({
      msg: `Los contactos han sido agregados a favoritos exitosamente`,
      data: contactIds.map(id => ({ id })) // Devolver una respuesta simplificada o más detallada según tus necesidades
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al agregar los contactos a favoritos', error: error.message });
  }
};
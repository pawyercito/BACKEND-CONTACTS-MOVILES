// controllers/groupListController.js
const Group = require('../../models/Group');

exports.listGroups = async (req, res) => {
  try {
    // Obtiene el ID del usuario logeado
    const userId = req.user.id;

    // Busca los grupos del usuario logeado
    const userGroups = await Group.find({ userId: userId });

    // Realiza la población de los contactos y el usuario dentro de estos grupos
    const populatedGroups = await Promise.all(userGroups.map(async (group) => {
      // Primera población: contactos
      let populatedGroup = await Group.populate(group, {
          path: 'contacts',
          model: 'Contact',
          select: 'name lastName number email address' // Selecciona todos los campos adicionales aquí
        });

      // Segunda población: usuario
      populatedGroup = await Group.populate(populatedGroup, { path: 'userId' });

      return populatedGroup;
    }));

    res.json(populatedGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los grupos' });
  }
};
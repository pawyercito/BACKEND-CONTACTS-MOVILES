// controllers/groupListController.js
const Group = require('../../models/Group');

exports.listGroups = async (req, res) => {
  try {
    // Modifica la consulta para incluir la población de los contactos
    const groups = await Group.find({})
    .populate({
        path: 'contacts',
        model: 'Contact',
        select: 'name lastName' // Corregido para seleccionar los campos correctos
      })
    .populate('userId')
    .exec();

    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar los grupos' });
  }
};
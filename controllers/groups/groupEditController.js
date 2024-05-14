// controllers/groupUpdateController.js
const Group = require('../../models/Group');

exports.updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    ).populate({
      path: 'contacts',
      model: 'Contact',
      select: 'name lastName' // Selecciona solo los campos name y lastName
    });

    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado o no tienes permiso para editarlo' });
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el grupo' });
  }
};
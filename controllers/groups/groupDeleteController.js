// controllers/groupDeleteController.js
const Group = require('../../models/Group');

exports.deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    // Cambia findOneAndRemove por findOneAndDelete
    const group = await Group.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!group) {
      return res.status(404).json({ msg: 'Grupo no encontrado o no tienes permiso para eliminarlo' });
    }
    res.json({ msg: 'Grupo eliminado exitosamente. Los contactos asociados quedan fuera del grupo.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar el grupo' });
  }
};
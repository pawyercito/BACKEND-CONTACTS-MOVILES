// controllers/groupCreateController.js
const Group = require('../../models/Group');

exports.createGroup = async (req, res) => {
  try {
    const newGroup = new Group({...req.body, userId: req.user._id });
    await newGroup.save();

    // Busca el grupo recién creado con la población de los contactos
    const populatedGroup = await Group.findById(newGroup._id)
     .populate({
        path: 'contacts',
        model: 'Contact',
        select: 'name lastName' // Selecciona solo los campos name y lastName
      });

    if (!populatedGroup) {
      return res.status(404).json({ msg: 'Grupo no encontrado después de la creación' });
    }

    res.status(201).json({ msg: 'Grupo creado exitosamente', group: populatedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el grupo' });
  }
};
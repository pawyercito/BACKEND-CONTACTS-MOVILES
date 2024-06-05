const User = require('../../models/User');

exports.modify = async (req, res) => {
  try {
    const { bio, website, location, username, email, newPassword } = req.body;

    // Verifica que req.user.id esté definido
    if (!req.user.id) return res.status(401).json({ msg: 'No autorizado' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    // Modificar el perfil solo si los datos están presentes
    if (bio) user.profile.bio = bio;
    if (website) user.profile.website = website;
    if (location) user.profile.location = location;

    // Cambiar el nombre de usuario y/o correo electrónico solo si están presentes
    if (username) user.username = username;
    if (email) user.email = email;

    // Cambiar la contraseña solo si está presente
    if (newPassword) {
      user.password = newPassword; // La contraseña será procesada por el pre-save hook
    }

    await user.save();

    // Devuelve los campos actualizados
    const updatedUser = await User.findById(req.user.id).select('-password'); // Excluye la contraseña
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
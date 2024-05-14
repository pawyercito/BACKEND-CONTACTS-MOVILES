// routes/groups.js
const express = require('express');
const router = express.Router();
const { createGroup } = require('../controllers/groups/groupCreateController');
const { updateGroup } = require('../controllers/groups/groupEditController');
const { listGroups } = require('../controllers/groups/groupListController'); // Importa el controlador que acabas de crear
const { deleteGroup } = require('../controllers/groups/groupDeleteController');
const authenticateUser = require('../middleware_auth');

// Rutas para grupos

// Ruta para eliminar un grupo
router.delete('/delete-group/:id', authenticateUser, deleteGroup);

// Ruta para crear un grupo
router.post('/create-group', authenticateUser, createGroup);

// Ruta para editar un grupo
router.put('/edit-group/:id', authenticateUser, updateGroup);

// Ruta para listar todos los grupos de cada usuario
router.get('/list-groups', authenticateUser, listGroups); // Utiliza el controlador listGroups aquí

module.exports = router;
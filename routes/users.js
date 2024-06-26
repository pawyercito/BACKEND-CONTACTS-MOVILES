const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { register } = require('../controllers/users/userCreateController'); 
const {login} = require('../controllers/users/userLoginController');
const {modify} = require('../controllers/users/userModifyController');
const authenticateUser = require('../middleware_auth');
const {remove} = require('../controllers/users/userDeleteController');
const {getUserById} = require('../controllers/users/userGetByIdController');


// Registro
router.post('/register', register);

// Inicio de sesión
router.post('/login', login);

//INICIO DEL MIDDLEWARE
router.use(authenticateUser);

// Editar perfil
router.put('/edit-profile', modify);

// Eliminar cuenta
router.delete('/delete-account', remove);

// Obtener usuario por ID
router.get('/user/:id', getUserById);

  
module.exports = router;
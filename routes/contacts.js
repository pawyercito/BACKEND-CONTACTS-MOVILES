// routes/contacts.js
const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contacts/contactCreateController');
const { viewContact } = require('../controllers/contacts/contactViewController');
const { modifyContact } = require('../controllers/contacts/contactEditController');
const { removeContact } = require('../controllers/contacts/contactDeleteController');
const { listContacts } = require('../controllers/contacts/contactListController');
const authenticateUser = require('../middleware_auth');

router.use(authenticateUser);

// Crear contacto
router.post('/create-contact', authenticateUser, createContact);

// Ver contacto
router.get('/view-contact/:id', authenticateUser, viewContact);

// Editar contacto
router.put('/edit-contact/:id', authenticateUser, modifyContact);

// Eliminar contacto
router.delete('/delete-contact/:id', authenticateUser, removeContact);


// Mostrar todos los contactos
router.get('/view-contacts', authenticateUser, listContacts);

module.exports = router;
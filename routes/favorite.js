const express = require('express');
const router = express.Router();
const { addFavorite } = require('../controllers/favorites/favoriteAddController');
const { removeFavorite } = require('../controllers/favorites/favoriteDeleteController');
const authenticateUser = require('../middleware_auth');

router.use(authenticateUser);

router.post('/add-favorite', authenticateUser, addFavorite);
router.post('/remove-favorite', authenticateUser, removeFavorite);

module.exports = router;
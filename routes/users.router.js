var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller');
const authorize = require('../_helpers/authorize');

router.post('/register', UserController.register);
router.post('/authenticate', UserController.authenticate);     // public route
router.get('/', UserController.getAll); // admin only
router.get('/:id', UserController.getById);       // all authenticated users

module.exports = router;

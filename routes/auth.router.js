var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

router.post('/authenticate', AuthController.authenticate);     // public route
router.get('/', authorize(Role.Admin), AuthController.getAll); // admin only
router.get('/:id', authorize(), AuthController.getById);       // all authenticated users

module.exports = router;
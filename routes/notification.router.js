var express = require('express');
var router = express.Router();
const NotifController = require('../controllers/notification.controller');

router.post('/', NotifController.create);
router.put('/:id', NotifController.update);
router.delete('/:id', NotifController.remove);
router.get('/', NotifController.getAll);
router.get('/:id', NotifController.getOne);

module.exports = router;

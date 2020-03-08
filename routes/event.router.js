var express = require('express');
var router = express.Router();
const EventController = require('../controllers/event.controller');
const upload = require('../services/multer.service');
const fileHandler = upload.fields([{name: 'poster', maxCount: 1}]);

router.post('/', fileHandler, EventController.create);
router.put('/:id', EventController.update);
router.delete('/:id', EventController.remove);
router.get('/', EventController.getAll);
router.get('/:id', EventController.getOne);

module.exports = router;

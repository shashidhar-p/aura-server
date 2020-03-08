var express = require('express');
var router = express.Router();
const CoordController = require('../controllers/coord.controller');
const upload = require('../services/multer.service');
const fileHandler = upload.fields([{name: 'image', maxCount: 1}]);

router.post('/', fileHandler, CoordController.create);
router.put('/:id', CoordController.update);
router.delete('/:id', CoordController.remove);
router.get('/', CoordController.getAll);
router.get('/:id', CoordController.getOne);

module.exports = router;

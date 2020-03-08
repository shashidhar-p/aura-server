var express = require('express');
var router = express.Router();
var EventController = require('../controllers/event.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aura Event Management Server' });
});
router.get('/clubWiseList', EventController.clubWiseList);
module.exports = router;

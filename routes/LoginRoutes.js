var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/LoginController.js');

/*
	Login
*/
router.post('/in', LoginController.login);


/*
	Logout
*/
router.get('/out', LoginController.logout);


module.exports = router;

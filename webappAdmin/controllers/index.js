var express = require('express'),
	//pub		= require('../common/public.js'),
	router	= express.Router();

router.get('/', function(req, res, next){
	res.render('home/index');
});

module.exports = router;

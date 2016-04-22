var express = require('express'),
	pub		= require('../../common/publicFn.js'),
	//stateFn	= require('../common/stateFn.js'),
	router	= express.Router();

router.get('/codeImg',function(req, res, next){//图片二维码生成
	if(req.query.reload == 1){
		var	json	=	{};
		json.status = 1;
		json.message = "刷新成功";
		json.data = {};
		json.data.url = "/home/codeImg";
		req.session.code = undefined;
		res.send(json);
	}else{
		res.writeHead(200, {'Content-Type': 'image/png'});
		if(req.session.code == undefined){
			res.end(pub.numCode(req,6));
		}else{
			res.end(pub.numCode(req,6,req.session.code));
		};
	};
}).get('/',function(req, res, next){
	res.render('index');
});

module.exports = router;

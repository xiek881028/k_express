function _public(req,res,dir){
	var	config	=	{};

	//默认初始化程序
	config.init = function(){
		for(fn in config){
			if(fn != 'init'){
				config[fn]();
			};
		}
	};

	//动态引入静态资源包
	config.assets = function(){
		var	assets	=	baga.assets,
			pathUrl	=	(req.url == '/'? '/home' : req.url),
			webName	=	dir.replace(/[\d\D]*(\/)/,''),
			assJson;
		res.locals.css = [];
		res.locals.js = [];
		//if(baga.env == 'dev'){
		assJson = assets[webName]['assets']['./' + webName + '/assets/' + pathUrl.split('/')[1] + 'Assets.json'];
		if(assJson != undefined){
			res.locals.css = assJson.css;
			res.locals.js = assJson.js;
		};
		//}else if(baga.env == 'prod'){
		//	res.locals.css.push('http://diankego-static.oss-cn-shenzhen.aliyuncs.com/' + webName + '/css' + pathUrl + '.min.css');
		//	res.locals.js.push('http://diankego-static.oss-cn-shenzhen.aliyuncs.com/' + webName + '/js' + pathUrl + '.min.js');
		//}
	};

	return config;


};

module.exports = _public;
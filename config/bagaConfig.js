module.exports = {
	path : function(){
		return	__dirname;
	},
	//网站配置
	bagaConfig : function(){
		var	config	=	{},
			_config	=	require('./config.json');
		/* 开发环境为dev,生产环境为prod */
		config	=	_config;
		return config;
	}
};
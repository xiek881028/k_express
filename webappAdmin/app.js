var express = require('express'),
	path	= require('path'),
	favicon	= require('serve-favicon'),
	pub		= require('../common/initFn.js'),
	pubFn	= require('../common/publicFn.js'),
	logger	= require('morgan'),
	cookieParser	= require('cookie-parser'),
	csrf	= require('csurf'),
	session	= require('express-session'),
	bodyParser		= require('body-parser'),
	__csrf	= '',

//设置csrf中间件
	csrfProtection	=	csrf({cookie: true}),
	parseForm		=	bodyParser.urlencoded({extended: false}),

	app = express();

//导入配置文件
//var	config = require('../bagaConfig.js')();
var	_config		= require('../config/config.json');
app.set('env',_config.env);//设置环境

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /static
app.use(favicon(path.join(__dirname, 'web/static', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(parseForm);
app.use(cookieParser());

app.use('/static',express.static(path.join(__dirname, 'web/static')));
app.use('/assets',express.static(path.join(__dirname, 'web/assets')));

//加入csrf
app.use(csrfProtection,function(req, res, next){
	__csrf = req.csrfToken();
	res.locals._csrf = __csrf;
	next();
});

//加入session
app.use(session({
	secret: 'bagazhu',
	saveUninitialized: true,
	resave: false,
	cookie: {}
}));

//通用页面init
app.use(function(req, res, next) {
	if(!/^(\/static)|(\/assets)/.test(req.url)){
		//动态引入静态资源管理器
		pub(req, res, __dirname).init();
	};
	next();
});

//动态注册controllers
pubFn.fileTree(__dirname+'/controllers').forEach(function(item){
	app.use((path.basename(item, '.js') == 'index'?'/' : '/' + path.basename(item, '.js')), require('./' + path.relative(__dirname,item.replace(/(.js)$/,''))));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	//为防止家里的小米路由劫持404页面，故改成错误500
	err.status = 500;
	next(err);
});

// error handlers
app.use(function(err, req, res, next) {
	var	assets	=	baga.assets,
		webName	=	path.basename(__dirname),
		assJson = assets[webName]['assets']['./' + webName + '/assets/baseAssets.json'];
	res.locals._csrf = __csrf;
	res.locals.css = assJson.css;
	res.locals.js = assJson.js;
	res.status(err.status || 500);
	res.render('home/error', {
		message: err.message,
		error: err
	});
});


module.exports = app;

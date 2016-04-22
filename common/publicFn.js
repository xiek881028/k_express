module.exports = {

	//isArray
	isArray : function(it){
		return Object.prototype.toString.call(it) === '[object Array]';
	},

	//fileTree
	//循环指定目录，输出目录内所有文件列表的数组
	fileTree : function(file){
		var	fs			=	require('fs'),
			fileList	=	[];
		function walk(file){
			var dirlist		=	fs.readdirSync(file);
			dirlist.forEach(function(item){
				if(fs.statSync(file + '/' + item).isDirectory()){
					walk(file + '/' + item);
				}else{
					fileList.push(file + '/' + item);
				}
			});
		};
		walk(file);
		return fileList;
	},

	//数组去重复
	//依赖 isArray
	noRepeat : function(__arr){
		var	_arr	=	[],
			arr		=	[],
			json	=	{};
		_arr	=	this.isArray(__arr) ? __arr : __arr.split(/[\f|\n|\r]+/);
		for(var	i=0,max=_arr.length; i<max; i++){
			if(!json[_arr[i]] && _arr[i] != ""){
				arr.push(_arr[i]);
				json[_arr[i]] = 1;
			}
		}
		return arr;
	},

	//生成指定位数的图片验证码
	numCode : function(req, max, str){
		var Canvas	= require('canvas'),
			Image	= Canvas.Image,
			canvas	= new Canvas(120, 50),
			arr		= [2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','X','Y','Z'],
			ctx		= canvas.getContext('2d'),
			num,
			outStr	= '',
			_width	= 12;

		ctx.font = '900 30px Impact';
		ctx.fillStyle = "#" + this.randomStr(3);
		if(str != undefined){
			var	_str	=	str.split("");
			for(var i=0;i<_str.length; i++){
				num = _str[i];
				ctx.fillText(num, _width + i*16, 35);
				outStr += num.toString();
			};
		}else{
			for(var i=0;i<max; i++){
				num = arr[Math.floor(Math.random()*31)];
				ctx.fillText(num, _width + i*16, 35);
				outStr += num.toString();
			};
		};
		req.session.code = outStr;
		return canvas.toBuffer();
	},

	//邮件发送公用方法
	mail : function(toWhere, title, html, errFn, successFn){
		var	mail	=	require('nodemailer'),
			_errFn	=	errFn || function(){},
			_sucFn	=	successFn || function(){},
			porter	=	mail.createTransport({
				host: 'demo.demo.com',
				port: 465,
				secure: true,
				auth: {
					user: 'demo@demo.com',
					pass: 'demo'
				}
			}),
			post	=	{
				from: '"八嘎猪" xiekai@bagazhu.com',
				to: toWhere,
				subject: title,
				html: html
			};

		porter.sendMail(post,function(err, info){
			if(err){
				_errFn(err);
			}else{
				_sucFn(info);
			};
		});
	},

	//view返回错误信息设置
	controllerErr : function(err, res, req){
		if(err != undefined){//处理错误信息
			res.locals.err = err;
		};
		req.session.err = '';
	},

	//正向AES加密，可用mode有aes128,aes192,aes256
	centerPwd : function(str, key, mode){
		var	crypto	= require('crypto'),
			key		=	key,
			_mode	=	mode || 'aes192',
			_crypto	=	crypto.createCipher(_mode,key),
			crypted	=	_crypto.update(str,'utf8','hex');
		crypted += _crypto.final('hex');
		return crypted;
	},

	//正向两次AES加密，两次加密key不一致
	twoCenterPwd : function(str, key1, key2, mode){
		var	key1	=	key1,
			key2	=	key2,
			_mode	=	mode || 'aes192';
		return this.centerPwd(this.centerPwd(str, key1, mode), key2, mode);
	},

	//反向AES解密
	uncenterPwd : function(str, key, mode){
		var	crypto	= require('crypto'),
			key		=	key,
			_mode	=	mode || 'aes192',
			_crypto	=	crypto.createDecipher(_mode,key),
			crypted	=	_crypto.update(str,'hex','utf8');
		crypted += _crypto.final('utf8');
		return crypted;
	},

	//反向两次AES解密
	twoUncenterPwd : function(str, key1, key2, mode){
		var	key1	=	key1,
			key2	=	key2,
			_mode	=	mode || 'aes192';
		return this.uncenterPwd(this.uncenterPwd(str, key2, mode), key1, mode);
	},

	//hash加密，可用mode有md5,sha1,sha224,sha256,sha384,sha512
	unreturnPwd : function(data, mode){
		var	crypto	= require('crypto'),
			_mode	= mode || 'sha256',
			hash	= crypto.createHash(_mode);
		hash.update(data);
		return hash.digest('hex');
	},

	//生成指定位数的随机字节
	randomStr : function(num){
		var	buf	= require('crypto').randomBytes(num);
		return buf.toString('hex');
	},

	//demo
	demo : function(){
		console.log('OK');
	}
};

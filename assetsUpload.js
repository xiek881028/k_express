exports.assets = function (){
	var	fs			=	require('fs'),
		_path		=	require('path'),
		pubFn		=	require('./common/publicFn.js'),
		webapp		=	require('./bin/webapp.json'),
		outJson		=	{},
		relyList	=	{},
		//unRelyArr为所有需要压缩的文件数组，既有反依赖关系的文件数组
		//unRelyJson	=	(baga.env == 'prod'?{}:webapp);
		unRelyJson	=	webapp;

	//if(!gitStr.git())return {};

	//依赖关系处理方法
	function upload(__path, arr){
		var path		=	'./' + __path + '/assets',
			relyTab		=	{};

		//处理选定文件的依赖关系
		function rely(file){
			var	relyJson	=	{};
			relyJson.css	=	[];
			relyJson.js		=	[];
			function eachFile(file){
				var	_file	= require(file),
					file	= _path.normalize(file);

				//处理css文件
				if(_file.css !== undefined){
					if(pubFn.isArray(_file.css)){
						_file.css.forEach(function(val){
							relyJson.css.unshift(val);
						});
					}else{
						relyJson.css.unshift(_file.css);
					};
				};

				//处理js文件
				if(_file.js !== undefined){
					if(pubFn.isArray(_file.js)){
						_file.js.forEach(function(val){
							relyJson.js.unshift(val);
						});
					}else{
						relyJson.js.unshift(_file.js);
					};
				};

				//处理依赖文件
				if(_file.depends !== undefined){
					if(pubFn.isArray(_file.depends)){
						_file.depends.forEach(function(val){
							eachFile(path + '/' + val);
						});
					}else{
						eachFile(path + '/' + _file.depends);
					}
				};
			};
			eachFile(file);
			relyTab[file] = {};
			relyTab[file].css = pubFn.noRepeat(relyJson.css);
			relyTab[file].js = pubFn.noRepeat(relyJson.js);

		};

		arr.forEach(function(file){
			rely(file);
		});

		relyList[__path] = {};
		relyList[__path].assets = relyTab;
	};

	//反依赖关系处理方法
	//__path为项目名称，_file为assets.json列表数组
	function unUpload(__path, _file){
		if(!_file.length)return;
		//path为项目assets路径
		var path		=	'./' + __path + '/assets/';
		unRelyJson[__path] = unRelyJson[__path].concat(_file);
		
		function unrely(_file){
			//循环项目中所有assets文件
			pubFn.fileTree(path).forEach(function(file){
				var	oneFile = require(file),
					file	= './' + _path.normalize(file);
				//如果有依赖
				if(oneFile.depends !== undefined){
					//如果依赖为数组
					if(pubFn.isArray(oneFile.depends)){
						//循环依赖数组
						oneFile.depends.forEach(function(item){
							if('./' + _path.normalize(path + item) == _file){
								unRelyJson[__path].push(file);
								unrely(file);
							};
						});
					}else if('./' + _path.normalize(path + oneFile.depends) == _file){
						unRelyJson[__path].push(file);
						unrely(file);
					};
				};
			});
		};
		unrely(_file);
		unRelyJson[__path] = pubFn.noRepeat(unRelyJson[__path]);
	};

	for(app in unRelyJson){
		upload(app,pubFn.fileTree('./' + app + '/assets'));
	};

	//fs.writeFileSync(__dirname + '/assetsList.json', JSON.stringify(relyList));
	return relyList;
};
var	mysql	= require('mysql'),
	conf	= require('../config/db.js'),
	$sql	= require('./userSqlMapping.js')
	$db		= mysql.createPool(conf.mysql),
	add		= "";

add = "CREATE TABLE `demo2` ("+
	"`id` INT(11) NOT NULL AUTO_INCREMENT,"+
	"`username` VARCHAR(50) NOT NULL COMMENT '用户名' COLLATE 'utf8_unicode_ci',"+
	"`password` VARCHAR(255) NOT NULL COMMENT '密码' COLLATE 'utf8_unicode_ci',"+
	"PRIMARY KEY (`id`)"+
")"+
"COLLATE='utf8_general_ci'"+
"ENGINE=InnoDB"+
";";


$db.getConnection(function(err, connection){
	connection.query(add,null,function(err, row, fields){
		console.log(err);
		connection.release();
	});
});

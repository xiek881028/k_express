// conf/db.js
// MySQL数据库联接配置
module.exports = {
  mysql: {
    host: 'localhost', 
    user: 'demo',
    password: 'demo',
	connectionLimit: 50,
    database:'test',
    port: 3306
  }
};
"use strict";
const mysqlDir = './../config/config';
class mysqlDb {
  constructor(m) {
    this.dataName = m;
    this.whereStr = null;
    this.fieldStr = null;
  };
  connection() {
    return require('mysql').createConnection(require(mysqlDir).DATA_BASE);  //引入mysql库并且创建连接 读取config模块的 DATA_BASE 属性
  };
  where(str) {
    this.whereStr = str;
    return this;
  };
  select(fn) {
    let connect = this.connection(),
        sql,
        dbData,
        where = this.whereStr ? ' where ' + this.whereStr : '',
        field = this.fieldStr ? this.fieldStr : '*';


    sql = 'SELECT ' + field + ' FROM ' + this.dataName + where;

    connect.connect();
    //console.log(typeof sql)

     connect.query(sql, function (err, rows, fields) {
      if (err) console.log(err);//throw err;

      fn&&fn(rows);
    });

     connect.end();
    //console.log(sql);

  };
  find(fn){
      this.select(function (rows) {
        fn&&fn(rows[0]);
      });
  };
  getField(str, fn) {
    this.fieldStr = str;
      this.select(function (rows) {
    //     rows = rows.map(function (items) {
    //         return items[str]
    //     });
    //     fn&&fn((rows.length < 2 ? rows[0] : rows));
          fn&&fn(rows[0][str]);
      });
  }
}

var M = function (dbName) {
  return new mysqlDb(dbName)
}

module.exports = M;

let pg = require('pg');
let conString = 'postgres://postgres:123456@localhost/test';
//数据库配置
const config = {
    user: 'postgres',
    database: 'test',
    password: '123456',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 3000
};

//获取client
function getClient(){
    let pool = new pg.Pool(config);
    return new Promise(function(resolve, reject){
        pool.connect(function(err, client, done){
            if(err){
                console.error('数据库连接出错',err);
                reject(err);
            }else{
                resolve(client);
            }
        });
    });
}

async function client2(){
    return await getClient();
}

let PG = function(){
    console.log('准备向test数据库连接...');
    this.client = client2();
    console.log(this.client);
    
}

// 查询函数
//@param str 查询语句
//@param value 相关值
//@param cb 回调函数
let clientHelper = function(str, value, cb){
    client.query(str, value, function(err, result){
    if(err){
        cb('err');
    }else{
        if(result.rows != undefined){
            cb(result.rows);
        }else{
            cb();
        }
    }
   })
}

//增
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param cb 回调函数
// insert into student(name, age) values('dai', 28)
PG.prototype.save = function(tablename, fields, cb){
    if(!tablename) return;
    //let str = 'insert into '+tablename+'(';
    let str = `insert into ${tablename}(`;
    let field = [];
    let value = [];
    let num = [];
    let count = 0;
    for(let i in fields){
        count++;
        field.push(i);
        value.push(fields[i]);
        num.push(`$${count}`);
    }
    str += field.join(',')+') values('+num.join(',')+')';
    console.log(this.client);
    clientHelper(str, value, cb);
}

//删除
//@param tablename 数据表名称
//@param fields 条件字段和值，json格式
//@param cb 回调函数
//delete from student where name='daili' and phone='15388383293'
PG.prototype.remove = function(tablename, fields, cb){
  if(!tablename) return;
  let str = 'delete from '+tablename+' where ';
  let field = [];
  let value = [];
  let count = 0;
  for(let i in fields){
      count++;
      field.push(i+'=$'+count);
      value.push(fields[i]);
  }
  str += field.join(' and ');
  clientHelper(str, value, cb);
}

//修改
//@param tablename 数据表名称
//@param fields 更新的字段和值，json格式
//@param mainfields 条件字段和值，json格式
// updates student set name='gao', phone='1536283293' where name='dai'
PG.prototype.update = function(tablename, mainfields, fields, cb){
  if(!tablename) return;
  let str = 'update '+tablename+' set ';
  let field = [];
  let value = [];
  let count = 0;
  for(let i in fields){
      count++;
      field.push(i+'=$'+count);
      value.push(fields[i]);
  }
  str += field.join(',')+' where ';
  field = [];
  for(let j in mainfields){
      count++;
      field.push(j+'=$'+count);
      value.push(mainfields[j]);
  }
  str += field.join(' and ');
  clientHelper(str, value, cb);
}

//查询
//@param tablename 数据表名称
//@param fields 条件字段和值，json名称
//@param returnfields 返回字段
//@param cb 回调函数
//select * from student where name=$1 and phone=$2
PG.prototype.select = function(tablename, fields, returnfields, cb){
   if(!tablename) return;
   let returnStr = '';
   if(returnfields.length == 0){
       returnStr = '*';
   }else{
       returnStr = returnfields.join(',');
   }
   let str = 'select '+returnStr+' from '+tablename+' where ';
   let field = [];
   let value = [];
   let count = 0;
   for(let i in fields){
       count++;
       field.push(i+'=$'+count);
       value.push(fields[i]);
   }
   str += field.join(' and ');
   clientHelper(str, value, cb);
}

module.exports = new PG();
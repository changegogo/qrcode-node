const pg = require('pg');

//数据库配置
const config = {
    user: 'postgres',
    database: 'test',
    password: '123456',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 3000
};

let pool = new pg.Pool(config);

//查询
pool.connect(function(err, client, done){
    if(err){
        return console.error('数据库连接出错',err);
    }
    client.query('select $1::varchar as out', ['hello world'], function(err, result){
        done();
        if(err){
            return console.error('查询出错', err);
        }
        console.log(result.rows[0].out);
    });
});
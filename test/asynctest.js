let Promise = require('promise');
let fs = require('fs');
let path = require('path');

let readFile = function(filepath){
    return new Promise(function(resolve, reject){
        fs.readFile(filepath, {flag: 'r+', encoding: 'utf8'}, function(err, data){
            if(!err){
                resolve(data);
            }else{
                reject('');
            }
        });
    });
}

let timeout = function(ms){
    return new Promise(function(resolve, reject){
        setTimeout(resolve, ms, '传递的内容');
    });
}

async function asyncWork(){
    let data = await readFile(`${__dirname}/asynctest.js`);
    let value = await timeout(1000);
    console.log(data);
    console.log(value);
}

asyncWork().catch(data=>{
    console.log(data);
});


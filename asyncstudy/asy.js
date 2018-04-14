// const fetch = require('node-fetch');

// function* gen(){
//     let url = 'https://api.github.com/users/github';
//     let result = yield fetch(url);
//     console.log(result.bio);
// }

// let g = gen();
// let result = g.next();
// result.value.then(function(data){
//     console.log(data);
//     return data.json();
// }).then(function(data){
//     g.next(data);
// });

const fs = require('fs');
let Thunk = function(filename){
    return function(callback){
       fs.readFile(filename, 'utf-8', callback);
    };
};

let readFileThunk = Thunk(__dirname + '/123.txt');
readFileThunk(function(err, data){
    console.log(data);
});
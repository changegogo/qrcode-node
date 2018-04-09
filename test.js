var utils = require('./utils');  
var async = require('async');  
  
var task1 = function(callback){  
    var url = 'http://www.baidu.com';  
    utils.createQr(url,'shibiema0xsxdd3BeR8RZeQakfzCYpxKpB6YixrWKdApwQTyKy'+'.png',function(err, data){  
        if(err){  
            console.log(err);  
            callback(err, null);  
            return;  
        }  
        callback(null,data);  
    })  
};  
  
var task2 = function(waterImg, callback){  
    //原图  
    var sourceImg = '1.jpeg';  
    utils.addWater(sourceImg, waterImg, function(data){  
        callback(null, data);  
    })  
};  
  
async.waterfall([task1,task2], function(err, result){  
    if(err){  
        console.log(err);  
        return;  
    }  
    console.log(result);  
})  
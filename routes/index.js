const express = require('express');
const router = express.Router();
const Promise = require('promise');
const utils = require('../utils');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/genposter', function(req, res, next){
    let identitycode = req.query.identitycode || req.body.identitycode;
    if(!identitycode){
      res.json({code: 201, msg: '用户识别码不能为空'});
      return;
    }
    // 检测验证码是否有效
    
    // 查找海报图片是否存在
    let p0 = function(){
      return new Promise(function(resolve, reject){
        let picPath = path.join(__dirname, '../poster/') + identitycode+'.png';
        fs.exists(picPath, function(exist){
          if(exist){
            reject({code: 200, msg: '图片存在', path: identitycode+'.png'});
          }else{
            resolve();
          }
        })
      });
    }
  
    // 1.生成二维码图 function(url,imgName, callback)
    let p1 = function(){
      return new Promise(function(resolve, reject){
        utils.createQr('https://www.baidu.com?identitycode='+identitycode, identitycode+'.png', function(err, data){
          if(err){  
            console.log(err);
            reject({code: 201, msg: '创建二维码失败'});
          }else{
            resolve(data);
          }
        } );
      });
    }

    // 2.生成海报
    let p2 = function(waterImg){
        return new Promise(function(resolve, reject){
          var sourceImg = '1.jpeg';
          utils.addWater(sourceImg, waterImg, function(postpath){
            resolve(postpath);
          });
        });
    }
    p0()
    .then(function(){
      return p1();
    })
    .then(function(data){
      return p2(data);
    })
    .then(function(path){
      res.json({code:200, msg: '生成成功', path: path});
    })
    .catch(function(obj){
      res.json(obj);
    })

});

module.exports = router;

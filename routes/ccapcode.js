var express = require('express');
var router = express.Router();
var ccap = require('ccap');

router.get('/verifcode', function(req, res) {
 function isHas(num, arr) {
   for (var i = 0; i < arr.length; i++) {
     if (num == arr[i]) return true;
   }
   return false;
 }
 var captcha = ccap({
   width:150,   //set width,default is 256
   height:60,   //set height,default is 60
   offset:35,   //set text spacing,default is 40
   quality:100, //set pic quality,default is 50
   fontsize:57, //set font size,default is 57
   generate: function() {
     var codeArr = [];
     // 用来生成4个随机数
     while (codeArr.length < 4) {
       var newNum = Math.floor(Math.random()*10);
       if (!isHas(newNum, codeArr)) {
         codeArr.push(newNum);
       }
     }
     return codeArr.join('');
   }
 });
 var ary = captcha.get();
 codeTxt = ary[0];
 var buf = ary[1];
 console.log(codeTxt);
 console.log(buf);
 res.end(buf);
});

module.exports = router;
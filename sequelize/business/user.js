const User = require('../model/User');

User.create({
    firstname: '代', 
    lastname: 'wang'
})
.then(function(user){
    console.log(user);
})
.catch(function(err){
    console.log(err);
});
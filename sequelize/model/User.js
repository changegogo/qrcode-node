"use strict";

const sequelize = require('../db').sequelize;
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    }
});

// force: true 如果表已经存在，将会丢弃表
// User.sync({force: true}).then(() => {
//     // 表已创建
//     return User.create({
//       firstName: 'John',
//       lastName: 'Hancock'
//     });
//   });

module.exports = User;
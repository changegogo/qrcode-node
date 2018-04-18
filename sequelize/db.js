const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://ngedu:ngedu123@127.0.0.1:5432/db_ngedu');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

exports.sequelize = sequelize;
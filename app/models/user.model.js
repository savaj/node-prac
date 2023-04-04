const {
    Model
  } = require('sequelize');
  
  module.exports.Gender = Object.freeze({
    Male: 'male',
    Female: 'female',
  });
  
  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
        // define association here
      }
    };
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
      },
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      age: DataTypes.INTEGER,
      Gender: {
        type: DataTypes.ENUM,
        values : Object.values(this.Gender),
        defaultValue :  this.Gender.Male
      },
    }, {
      sequelize,
      modelName: 'User',
    });
    return User;
  };
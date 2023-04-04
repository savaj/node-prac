const {
    Model
  } = require('sequelize');
  
  module.exports = (sequelize, DataTypes) => {
    class Sales extends Model {
      static associate(models) {
        // define association here
      }
    };
    Sales.init({
      userId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      date: DataTypes.DATE
    }, {
      sequelize,
      modelName: 'Sales',
    });
    return Sales;
  };
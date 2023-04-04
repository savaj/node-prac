const db = require("../models");
const Sales = db.sales;
const User = db.user;

const Op = db.Sequelize.Op;


// Create and Save a new Sales
exports.CreateOrUpdate = async (req, res) => {
  const { userId, amount, date } = req.body;

  // Validate request
  if (!amount) {
    res.status(400).send({
      message: "amount can not be empty!"
    });
    return;
  }

  if (!date) {
    res.status(400).send({
      message: "date can not be empty!"
    });
    return;
  }

  if (!userId) {
    res.status(400).send({
      message: "userId can not be empty!"
    });
    return;
  }

  const UserData = await User.findOne({ where: { id: userId } });
  console.log(UserData);

  if (UserData) {
    // Check if sale already exists for this user on this date
    const existingSale = await Sales.findOne({ where: { userId, date } });

    if (existingSale) {
      // Update existing sale
      await existingSale.update({ amount });
      res.json({ message: 'Sale updated successfully' });
    } else {
      // Create new sale
      await Sales.create({ userId, amount, date });
      res.json({ message: 'Sale created successfully' });
    }
  } else {
    res.status(400).send({
      message: "User Not Found!"
    });
    return;
  }

};


exports.ReportByDate = async (req, res) => {
  const { DateParam, userIdParam } = req.params;
    var endDate = new Date();
    var startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);;

    switch (DateParam) {
      case 'Last7Days':
        startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);
        endDate = new Date();
        break;
      case 'LastMonth':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate = new Date();
      break;

      default:
        startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);
        endDate = new Date();
        break;
    }
    var sales = '';
    if(userIdParam){
      sales = await Sales.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
          userId: {
            [Op.eq]: userIdParam
          }
        },
        order: [['date', 'ASC']],
      });
    } else{
      sales = await Sales.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          }
        },
        order: [['date', 'ASC']],
      });
    }
    
    

    const data = {
      duration: [],
      sales: [],
    };

    const currentDate = startDate;

    while (currentDate <= endDate) {

      const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() +
        1}-${currentDate.getFullYear()}`;

      data.duration.push(formattedDate);

      const salesAmount = sales.reduce((total, sale) => {
        const saleDate = new Date(sale.date);
        if (
          saleDate.getDate() === currentDate.getDate() &&
          saleDate.getMonth() === currentDate.getMonth() &&
          saleDate.getFullYear() === currentDate.getFullYear()
        ) {
          return total + sale.amount;
        }
        return total;
      }, 0);

      data.sales.push(salesAmount);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json({ data });
  return;
};
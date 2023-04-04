module.exports = app => {
    const sales = require("../controllers/sales.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Sales
    router.post("/", sales.CreateOrUpdate);

    // Sales Report By Date
    router.get("/:DateParam?/:userIdParam?", sales.ReportByDate);

    app.use('/api/sales', router);
  };
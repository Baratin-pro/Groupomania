"user strict";

const router = require("express").Router();
const userCtrl = require("../controllers/user.js");

module.exports = (app) => {
  router.post("/signup", userCtrl.Signup);

  app.use("/api/user", router);
};

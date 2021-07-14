"use strict";

const db = require("../models");

exports.Signup = async (req, res, next) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

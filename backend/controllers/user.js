"use strict";

const db = require("../models");
const schemaSignup = require("../schema/schemaSignup.js");
const bcrypt = require("bcryptjs");

exports.Signup = async (req, res, next) => {
  try {
    const user = {
      firstname: String(req.body.firstname),
      lastname: String(req.body.lastname),
      email: String(req.body.email),
      password: String(bcrypt.hashSync(req.body.password, 10)),
    };
    const isValid = await schemaSignup.validateAsync(user);
    if (!isValid) {
      res.status(400).send("Erreur des données envoyée");
    } else {
      db.user
        .create(user)
        .then(() => {
          res.status(201).send({ message: "Utilisateur crée avec succes" });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

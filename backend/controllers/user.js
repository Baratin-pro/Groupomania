"use strict";

const db = require("../models");
const schemaSignup = require("../schema/schemaSignup.js");
const bcrypt = require("bcryptjs");

exports.Signup = async (req, res, next) => {
  try {
    if (req.body.password === req.body.confirmationPassword) {
      const user = {
        firstname: String(req.body.firstname),
        lastname: String(req.body.lastname),
        email: String(req.body.email),
        password: String(bcrypt.hashSync(req.body.password, 10)),
      };
      const checkEmail = await db.user.findOne({
        where: { email: user.email },
      });
      if (checkEmail) {
        return res.status(400).json({ message: "Compte déjà utilisé " });
      } else {
        const isValid = await schemaSignup.validateAsync(user);
        if (!isValid) {
          return res
            .status(400)
            .send({ message: "Erreur des données envoyée" });
        } else {
          db.user
            .create(user)
            .then(() => {
              return res
                .status(201)
                .send({ message: "Utilisateur créé avec succes" });
            })
            .catch((err) => {
              return res.status(500).send({
                message: err.message,
              });
            });
        }
      }
    } else {
      return res
        .status(400)
        .send({ message: "Confirmation du mot de passe incorrect ! " });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

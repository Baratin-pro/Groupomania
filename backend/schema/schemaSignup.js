"use strict";

const Joi = require("joi");

const schemaSignup = Joi.object({
  firstname: Joi.string()
    .alphanum()
    .min(2)
    .pattern(new RegExp(/[^0-9]/))
    .required(),
  lastname: Joi.string()
    .alphanum()
    .min(2)
    .pattern(new RegExp(/[^0-9]/))
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .max(128)
    .required(),
  password: Joi.string().min(8).required(),
  confirmationPassword: Joi.equal(Joi.ref("password")),
});

module.exports = schemaSignup;

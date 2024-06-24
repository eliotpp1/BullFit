const Joi = require("joi");

// Schéma de validation pour l'enregistrement d'utilisateur
const signinValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

// Schéma de validation pour la connexion d'utilisateur
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{8,30}$")),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.signinValidation = signinValidation;

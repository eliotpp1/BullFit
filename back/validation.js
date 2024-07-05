const Joi = require("joi");

const signinValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(1024).required(),
    stats: Joi.object({
      mas: Joi.number().required(),
      fc60: Joi.number().required(),
      fc65: Joi.number().required(),
      fc75: Joi.number().required(),
      fc85: Joi.number().required(),
      fc95: Joi.number().required(),
      fc100: Joi.number().required(),
    }).required(),
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

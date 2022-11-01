const Joi = require("joi");

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(10).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
  changePutValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(10).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};

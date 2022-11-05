const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(2).max(10).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().required(),
});

const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(2).max(10),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
});

module.exports = { schemaPost, schemaPut };

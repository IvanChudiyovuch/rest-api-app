const validationBody = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      validationResult.error = 400;
    }

    next(validationResult.error);
  };
};

module.exports = {
  validationBody,
};

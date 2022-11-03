const validationBody = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  };
};

module.exports = {
  validationBody,
};

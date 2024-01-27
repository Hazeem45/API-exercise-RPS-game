const {validationResult} = require("express-validator");

const schemaValidation = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.statusCode = 400;
    return res.send(result.errors);
  } else {
    next();
  }
};

module.exports = schemaValidation;

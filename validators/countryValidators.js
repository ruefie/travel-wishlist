const { body, validationResult } = require('express-validator');

const countryValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty().withMessage('Name cannot be empty'),
    body('alpha2Code')
      .trim()
      .isLength({ min: 2, max: 2 }).withMessage('Alpha 2 Code must be 2 characters long')
      .isAlpha().withMessage('Alpha 2 Code must only contain alphabetic characters'),
    body('alpha3Code')
      .trim()
      .isLength({ min: 3, max: 3 }).withMessage('Alpha 3 Code must be 3 characters long')
      .isAlpha().withMessage('Alpha 3 Code must only contain alphabetic characters'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  countryValidationRules,
  validate,
};

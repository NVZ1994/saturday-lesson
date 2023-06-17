const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLoginValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = userLoginValidation;

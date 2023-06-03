const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  number: Joi.string().min(6).max(12).required(),
});

const REQUIRED_FIELDS = ["name", "number"];

const contactValidation = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  for (const field of REQUIRED_FIELDS) {
    if (req.body[field] === undefined) {
      res.status(400).json({ message: `Filed '${field}' must be filled` });
      return;
    }
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = contactValidation;

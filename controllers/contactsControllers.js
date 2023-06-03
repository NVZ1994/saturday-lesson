const { getAll, add } = require("../services/contactServices");

const controllerGetAll = async (req, res, next) => {
  const result = await getAll();
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await add(req.body);
  res.status(201).json(result);
};

module.exports = {
  controllerGetAll,
  addContact,
};

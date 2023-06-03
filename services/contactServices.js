const Contact = require("../db/models/contactModel");

const getAll = async () => {
  const result = await Contact.find();
  return result;
};

const add = async (data) => {
  const result = await Contact.create(data);
  return result;
};

module.exports = {
  getAll,
  add,
};

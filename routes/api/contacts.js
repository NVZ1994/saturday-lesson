const express = require("express");
const router = express.Router();

const contactValidation = require("../../middlewares/validation/contactValidation");
const {
  controllerGetAll,
  addContact,
} = require("../../controllers/contactsControllers");

router.get("/", controllerGetAll);

router.post("/", contactValidation, addContact);

router.delete("/:contactId");

router.put("/:contactId");

module.exports = router;

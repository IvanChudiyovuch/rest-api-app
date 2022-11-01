const express = require("express");

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/getContactsControllers");

const {
  addPostValidation,
  changePutValidation,
} = require("../../middleware/validationMiddleware");

const router = express.Router();

router.get("/", listContacts);

router.get("/:id", getContactId);

router.post("/", addPostValidation, addContact);

router.delete("/:id", removeContact);

router.put("/:id", changePutValidation, updateContact);

module.exports = router;

const express = require("express");

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/getContactsControllers");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactId);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;

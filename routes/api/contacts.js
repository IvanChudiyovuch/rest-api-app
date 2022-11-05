const express = require("express");

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/getContactsControllers");

const { validationBody } = require("../../middleware/validationMiddleware");

const { schemaPost, schemaPut } = require("../../schema/schemaValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(listContacts));

router.get("/:id", asyncWrapper(getContactId));

router.post("/", validationBody(schemaPost), asyncWrapper(addContact));

router.delete("/:id", asyncWrapper(removeContact));

router.put("/:id", validationBody(schemaPut), asyncWrapper(updateContact));

module.exports = router;

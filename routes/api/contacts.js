const express = require("express");

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/getContactsControllers");

const { validationBody } = require("../../middleware/validationMiddleware");

const {
  schemaPost,
  schemaPut,
  schemaPatch,
} = require("../../schema/schemaValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(listContacts));

router.get("/:id", asyncWrapper(getContactId));

router.post("/", validationBody(schemaPost), asyncWrapper(addContact));

router.delete("/:id", asyncWrapper(removeContact));

router.put("/:id", validationBody(schemaPut), asyncWrapper(updateContact));

router.patch(
  "/:id/favorite",
  validationBody(schemaPatch),
  asyncWrapper(updateStatusContact)
);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactId,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

const { validationBody } = require("../../middleware/validationMiddleware");

const {
  schemaPost,
  schemaPut,
  schemaPatch,
} = require("../../schema/schemaValidation");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(authMiddleware);

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

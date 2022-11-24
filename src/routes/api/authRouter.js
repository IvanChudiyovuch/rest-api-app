const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  changeUserSubscriptionController,
  changeUserAvatarController,
} = require("../../controllers/authControllers");

const {
  schemaPostUser,
  schemaPatchUser,
} = require("../../schema/userShemaValidation");

const { validationBody } = require("../../middleware/validationMiddleware");

const { authMiddleware } = require("../../middleware/authMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { uploadFile } = require("../../middleware/uploadMiddleware");

router.post(
  "/registration",
  validationBody(schemaPostUser),
  asyncWrapper(registrationController)
);

router.post(
  "/login",
  validationBody(schemaPostUser),
  asyncWrapper(loginController)
);

router.get("/logout", authMiddleware, asyncWrapper(logOutController));

router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));

router.patch(
  "/subscription",
  authMiddleware,
  validationBody(schemaPatchUser),
  asyncWrapper(changeUserSubscriptionController)
);

router.patch(
  "/avatars",
  authMiddleware,
  uploadFile.single("avatar"),
  asyncWrapper(changeUserAvatarController)
);

module.exports = router;

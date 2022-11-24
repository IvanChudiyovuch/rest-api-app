const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  changeUserSubscriptionController,
  changeUserAvatarController,
  verificationUserController,
  resendVerificationUserController,
} = require("../../controllers/authControllers");

const {
  schemaPostUser,
  schemaPatchUser,
  schemaVerifyUser,
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

router.get(
  "/verify/:verificationToken",
  asyncWrapper(verificationUserController)
);

router.post(
  "/verify",
  validationBody(schemaVerifyUser),
  asyncWrapper(resendVerificationUserController)
);

module.exports = router;

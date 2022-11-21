const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");
const storeImage = path.join(process.cwd(), "public/avatars");
const { customError } = require("../helpers/error");
const { User } = require("../models/usersModel");
const {
  registrationUser,
  loginUser,
  changeUserSubscription,
  changeUserAvatar,
} = require("../services/authServices");

const registrationController = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) throw customError({ status: 409, message: "Email in use" });

  await registrationUser(email, password, subscription);

  res.json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
      message: "Registration successful",
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const currentUser = await loginUser(email, password);

  if (!currentUser)
    throw customError({ status: 401, message: "Email or password is wrong" });

  res.json({
    status: "success",
    code: 200,
    token: currentUser.token,
    data: {
      email,
      subscription: "starter",
    },
  });
};

const logOutController = async (req, res) => {
  res.json({
    status: "success",
    code: 204,
    data: {
      message: "No Content",
    },
  });
};

const getCurrentUserController = (req, res, next) => {
  const { subscription } = req.user;
  const { email } = req.body;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

const changeUserSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const newSubscription = await changeUserSubscription(subscription, _id);

  if (!newSubscription) throw customError({ status: 400, message: "error" });

  res.status(200).json({ subscription: newSubscription });
};

const changeUserAvatarController = async (req, res, next) => {
  if (!req.file)
    throw customError({
      status: 400,
      message: "Wrong file type. Only .jpeg, .jpg or .png are allowed.",
    });

  const { path: temporaryFilePath, originalname } = req.file;
  const { _id } = req.user;
  const newFileName = uuidv4() + path.extname(originalname);
  const newFilePath = path.join(storeImage, newFileName);

  const file = await Jimp.read(temporaryFilePath);
  file.resize(250, 250).write(temporaryFilePath);

  await fs.rename(temporaryFilePath, newFilePath);

  const avatarURL = path.join("avatars", newFileName);

  const newAvatar = await changeUserAvatar(avatarURL, _id);

  res.json({
    status: 200,
    newAvatar,
  });
};

module.exports = {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  changeUserSubscriptionController,
  changeUserAvatarController,
};

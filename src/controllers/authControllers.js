const { customError } = require("../helpers/error");
const { User } = require("../models/usersModel");
const {
  registrationUser,
  loginUser,
  changeUserSubscription,
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

module.exports = {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  changeUserSubscriptionController,
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { User } = require("../models/usersModel");
const { JWT_SECRET } = require("../../config");
const { sendVerificationMail } = require("../helpers/emailService");

const registrationUser = async (email, password, subscription) => {
  const verificationToken = uuid();

  const user = new User({
    email,
    password: await bcrypt.hash(password, 10),
    subscription,
    avatarURL: await gravatar.url(email, { protocol: "https" }),
    verificationToken,
  });

  if (!user) {
    return null;
  }

  await user.save();
  await sendVerificationMail(email, verificationToken);
  return user;
};

const loginUser = async (email, password) => {
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    return null;
  }

  const isValidePassword = await bcrypt.compare(password, currentUser.password);

  if (!isValidePassword) {
    return null;
  }

  const payload = { id: currentUser.id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1w" });
  await User.findByIdAndUpdate(
    { _id: currentUser.id },
    { token },
    { new: true }
  );

  const user = {
    token,
    user: {
      email: currentUser.email,
      subscription: currentUser.subscription,
    },
  };

  return user;
};

const changeUserSubscription = async (subscription, _id) => {
  const results = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    {
      returnOriginal: false,
    }
  );

  return results.subscription;
};

const changeUserAvatar = async (avatar, _id) => {
  const results = await User.findByIdAndUpdate(
    { _id },
    { avatarURL: avatar },
    {
      returnOriginal: false,
    }
  );
  return results.avatarURL;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  );

  return user;
};

const checkVerification = async ({ email }) => {
  const user = await User.findOne({ email, verify: false });

  if (!user) return null;

  await sendVerificationMail(user.email, user.verificationToken);

  return user;
};

module.exports = {
  registrationUser,
  loginUser,
  changeUserSubscription,
  changeUserAvatar,
  verifyUser,
  checkVerification,
};

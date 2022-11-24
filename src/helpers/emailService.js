const nodemailer = require("nodemailer");
const { EMAIL_LOGIN, EMAIL_PASSWORD, EMAIL_SENDER } = require("../../config");

const sendVerificationMail = async (email, verificationToken) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_LOGIN,
      pass: EMAIL_PASSWORD,
    },
  });

  const emailBody = {
    from: EMAIL_SENDER,
    to: email,
    subjekt: "Please verify your email",
    text: `Hello dear user. Open this link http://localhost:3000/api/users/verify/${verificationToken} to verify your email.`,
    html: `<h4>Hello dear user</h4></br>
          <p>Click <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a> to verify your email.</p>`,
  };

  const respons = await transport.sendMail(emailBody);

  console.log("email sent", respons);
};

module.exports = { sendVerificationMail };

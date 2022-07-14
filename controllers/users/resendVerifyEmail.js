const { User, joiEmailSchema } = require("../../models/users");
const { createError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { error } = joiEmailSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(400);
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Confirm</a>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;

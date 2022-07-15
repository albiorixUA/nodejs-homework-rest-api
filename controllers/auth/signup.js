const { User, joiRegisterSchema } = require("../../models");
const gravatar = require("gravatar");
const { createError, sendMail } = require("../../helpers");
const idGenerate = require("bson-objectid");

const signup = async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const avatarUrl = gravatar.url(email);
  const verificationToken = idGenerate();
  const newUser = new User({ name, email, avatarUrl, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm</a>`,
  };
  await sendMail(mail);
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarUrl,
    },
  });
};

module.exports = signup;

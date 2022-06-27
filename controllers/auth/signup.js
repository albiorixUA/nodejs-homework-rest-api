const { User, joiRegisterSchema } = require("../../models");
const { createError } = require("../../helpers");

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
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;

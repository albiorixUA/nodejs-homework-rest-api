const { Contact, joiContactSchema } = require("../../models");
const { createError } = require("../../helpers");

const add = async (req, res) => {
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = add;

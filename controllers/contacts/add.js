const { createError } = require("../../helpers");
const { contactsSchema } = require("../../schemas");
const contacts = require("../../models/contacts");

const add = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;

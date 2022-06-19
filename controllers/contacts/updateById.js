const { createError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { contactsSchema } = require("../../schemas");

const updateById = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;

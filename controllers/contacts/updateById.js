const { Contact, joiContactSchema } = require("../../models");
const { createError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { error } = joiContactSchema.validate(req.body);
  if (error) {
    throw createError(400);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  res.json(result);
};

module.exports = updateById;

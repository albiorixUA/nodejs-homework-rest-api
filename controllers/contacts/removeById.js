const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = removeById;

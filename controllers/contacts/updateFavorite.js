const { Contact, favoriteJoiSchema } = require("../../models");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const { error } = favoriteJoiSchema.validate({ favorite });
  if (error) {
    throw createError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  res.json(result);
};

module.exports = updateFavorite;

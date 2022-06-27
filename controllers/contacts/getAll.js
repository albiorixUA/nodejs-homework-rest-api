const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id name email");
  res.json(result);
};

module.exports = getAll;

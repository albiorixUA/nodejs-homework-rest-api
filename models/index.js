const { Contact, joiContactSchema, favoriteJoiSchema } = require("./contacts");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("./users");

module.exports = {
  Contact,
  joiContactSchema,
  favoriteJoiSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};

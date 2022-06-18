const fs = require("fs/promises");
const path = require("path");
const id = require("bson-objectid");

const contactPath = path.join(__dirname, "./contacts.json");

const updateData = async (contact) => {
  await fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((iteam) => iteam.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateData(data);
  return removeContact;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = {
    id: id(),
    ...body,
  };
  data.push(newContact);
  updateData(data);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const idx = data.findIndex((iteam) => iteam.id === contactId);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id: contactId, ...body };
  updateData(data);
  return data[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

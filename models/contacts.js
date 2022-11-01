const fs = require("fs/promises");
const path = require("path");

// const contactsPath = path.join(__dirname, "./contacts.json");
const contactsPath = path.resolve("models/contacts.json");

const getAllContacts = async () => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};

const getContactById = async (contactId) => {
  const db = await getAllContacts();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContactById = async (contactId) => {
  const db = await getAllContacts();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const createContact = async ({ name, email, phone }) => {
  const id = new Date().getTime().toString();
  const contact = { id, name, email, phone };
  const db = await getAllContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return contact;
};

const updateContactById = async (contactId, body) => {};

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContactById,
};

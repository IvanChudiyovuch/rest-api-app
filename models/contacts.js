const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
};

const getContactById = async (id) => {
  const db = await getAllContacts();
  const contact = db.find((item) => item.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContactById = async (id) => {
  const db = await getAllContacts();
  const contact = db.find((item) => item.id === id);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

const createContact = async (name, email, phone) => {
  const id = new Date().getTime().toString();
  const contact = { id: id, name: name, email: email, phone: phone };
  const db = await getAllContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  return contact;
};

const updateContactById = async (id, name, email, phone) => {
  const db = await getAllContacts();
  const contactIndex = db.findIndex((contact) => contact.id === id);
  if (contactIndex !== -1) {
    db[contactIndex].name = name;
    db[contactIndex].email = email;
    db[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return db[contactIndex];
  } else return null;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContactById,
};

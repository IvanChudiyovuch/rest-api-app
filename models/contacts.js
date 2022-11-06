const { Contact } = require("../db/contactModale.js");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const removeContactById = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const createContact = async (name, email, phone, favorite = false) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContactById = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  });
};

const updateStatusContactById = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  });
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContactById,
  updateStatusContactById,
};

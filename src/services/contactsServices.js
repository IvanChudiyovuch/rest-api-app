const { Contact } = require("../models/contactModel");

const getAllContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (id) => {
  const result = await Contact.findOne({ _id: id });
  return result;
};

const removeContactById = async (id) => {
  const result = await Contact.findByIdAndRemove({ _id: id });
  return result;
};

const createContact = async (name, email, phone, favorite = false) => {
  const result = await Contact.create({ name, email, phone, favorite });
  return result;
};

const updateContactById = async (id, fields) => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  });
  return result;
};

const updateStatusContactById = async (id, fields) => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, fields, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContactById,
  createContact,
  updateContactById,
  updateStatusContactById,
};

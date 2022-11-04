const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
} = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const results = await getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts: results },
  });
};

const getContactId = async (req, res, next) => {
  const { id } = req.params;
  const results = await getContactById(id);
  if (results) {
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } else {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${id}`,
      data: "Not Found",
    });
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const results = await createContact(name, email, phone);
  res.json({
    status: "success",
    code: 200,
    data: { contacts: results },
  });
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContactById(id);
  if (result) {
    res.json({
      status: "success",
      code: 200,
      data: { contact: result },
    });
  } else {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contact id: ${id}`,
      data: "Not Found",
    });
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const results = await updateContactById(id, body);
  if (results !== null) {
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactId,
  addContact,
  removeContact,
  updateContact,
};

const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
  updateStatusContactById,
} = require("../services/contactsServices");

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
  const { name, email, phone, favorite } = req.body;
  const results = await createContact(name, email, phone, favorite);
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
  if (!results) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: results,
    },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const results = await updateStatusContactById(id, body);
  if (!results) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: results,
    },
  });
};

module.exports = {
  listContacts,
  getContactId,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

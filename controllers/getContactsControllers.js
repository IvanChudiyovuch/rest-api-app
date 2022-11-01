const {
  getAllContacts,
  getContactById,
  createContact,
  removeContactById,
  updateContactById,
} = require("../models/contacts");

const listContacts = async (req, res, next) => {
  try {
    const results = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const results = await createContact(name, email, phone);
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const results = await updateContactById(id, name, email, phone);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactId,
  addContact,
  removeContact,
  updateContact,
};

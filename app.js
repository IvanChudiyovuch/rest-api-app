const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./src/routes/api/contacts");
const authRouter = require("./src/routes/api/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
require("./src/passport/passport");

app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status, message } = err;
  if (!status || !message) {
    return res.status(500).json({ message: "Server Internal Error" });
  }
  res.status(status).json({ message: message });
});

module.exports = app;

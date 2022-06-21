const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT), console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

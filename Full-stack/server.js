const express = require("express");
const mongoose = require("mongoose");

const { MONGO_URI, PORT } = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(_ => console.log("Connected to MongoDB."))
    .catch(err =>
        console.log("Connect to MongoDB with Error Message: ", err.errmsg)
    );

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, _ => console.log(`Server running on port ${PORT}.`));

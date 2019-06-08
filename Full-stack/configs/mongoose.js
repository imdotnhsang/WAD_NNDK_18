const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true, useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to MongoDB.");
    })
    .catch(err => console.log("Connect to MongoDB with Error Message: ", err.errmsg));

module.exports = mongoose;
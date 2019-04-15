const server = require("./server");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME, useNewUrlParser: true }).then(() => server.listen(process.env.PORT));

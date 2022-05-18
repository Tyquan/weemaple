const mongoose = require("mongoose");

const ApiSchema = mongoose.Schema({
    creationDate: Date
}, {strict: false});

const ApiModel = mongoose.model("Api", ApiSchema);

module.exports = ApiModel;
const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;

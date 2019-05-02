const mongoose = require("mongoose");
const { Schema } = mongoose;

const Todo = new Schema({
  todo: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Todo", Todo);

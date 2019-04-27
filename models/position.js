const mongoose = require("mongoose");
const { Schema } = mongoose;

const Position = new Schema({
  position: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Position", Position);

const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Todo = require("../models/todo");
const validator = require("validator");

module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = args.userInput.email,
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid" });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "password too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists already!");
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  createTodo: async function({ userInput }, req) {
    const errors = [];
    if (
      validator.isEmpty(userInput.todo) ||
      !validator.isLength(userInput.todo, { min: 4 })
    ) {
      errors.push({ message: "input is too short!" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingTodo = await Todo.findOne({
      todo: userInput.todo
    });
    if (existingTodo) {
      const error = new Error("Todo exists already!");
      throw error;
    }
    const todo = new Todo({
      todo: userInput.todo
    });
    const createdTodo = await todo.save();
    return { ...createdTodo._doc, _id: createdTodo._id.toString() };
  },
  deleteTodo: async function({ _id }, req) {
    const deletedTodo = await Todo.findByIdAndDelete({ _id });
    return {
      _id: deletedTodo.id,
      todo: deletedTodo.todo
    };
  },
  hello() {
    return "Hello World!";
  },
  todos() {
    return Todo.find();
  }
};

const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post {
  _id: ID!
  title: String!
  content: String!
  imageUrl: String!
  creator: User!
  createdAt: String!
  updatedAt: String!
}

type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  status: String!
  posts: [Post!]!
}

type Todo {
  _id: ID!
  todo: String!
}

type DeletedTodo {
  _id: ID!
}

input UserInputData {
  email: String!
  name: String!
  password: String!
}

input UserInputTodo {
  todo: String!
}

type RootQuery {
  hello: String
  todos: [Todo!]!
}

type RootMutation {
  createUser(userInput: UserInputData): User!
  createTodo(userInput: UserInputTodo): Todo!
  deleteTodo(_id: ID!): Todo
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

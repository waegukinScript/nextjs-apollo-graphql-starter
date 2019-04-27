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

type Position {
  _id: ID!
  position: String!
}

input UserInputData {
  email: String!
  name: String!
  password: String!
}

input UserInputPosition {
  position: String!
}

type RootQuery {
  hello: String
  positions: [Position!]!
}

type RootMutation {
  createUser(userInput: UserInputData): User!
  createPosition(userInput: UserInputPosition): Position!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

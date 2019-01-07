const gql = require('graphql-tag');
const deployment = require('./deployment');
const publisher = require('./publisher');
const user = require('./user');

module.exports = gql`

scalar Date
scalar ObjectID

directive @applyInterfaceFields on OBJECT
directive @requiresAuth(role: UserRole) on FIELD_DEFINITION

type Query {
  ping: String!
}

type Mutation {
  logoutUser: String
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

interface Timestampable {
  createdAt: Date
  updatedAt: Date
}

interface UserAttributable {
  createdBy: User
  updatedBy: User
}

enum SortOrder {
  asc
  desc
}

input PaginationInput {
  limit: Int = 10
  after: String
}

${deployment}
${publisher}
${user}

`;

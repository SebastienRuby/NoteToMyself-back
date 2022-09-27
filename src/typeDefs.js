import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    user(id: ID!): user
    viewer: User!
  }

  type Mutation {
    login(email: String!, password: String!): String
  }
`;

const { gql } = require("apollo-server");

export const typeDefsUser = gql`
  type UserType {
    id: ID
    first_name: String!
    last_name: String!
    avatar: String
    email: String!
    phone: String!
    password: String!
    repeatPassword: String!
    hourly_rate: Int
    description: String!
  }
  type query {
    getUsers: [UserType]
    getOneUser(id: ID): UserType
  }
`;

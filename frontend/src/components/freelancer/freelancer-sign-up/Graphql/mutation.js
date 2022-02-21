import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation addUser(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $email: String!
    $password: String!
    $repeatPassword: String!
    $hourly_rate: Int!
    $description: String!
  ) {
    addUser(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      password: $password
      repeatPassword: $repeatPassword
      hourly_rate: $hourly_rate
      description: $description
    ) {
      first_name
    }
  }
`;

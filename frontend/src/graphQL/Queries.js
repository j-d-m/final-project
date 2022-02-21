import { gql } from "@apollo/client";

//user query
export const GET_ONE_USER = gql`
  query GetOneUser {
    getOneUser(id: "") {
      id
      first_name
      last_name
      avatar
      email
      phone
      password
      repeatPassword
      hourly_rate
      description
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      first_name
      last_name
      avatar
      email
      phone
      password
      repeatPassword
      hourly_rate
      description
    }
  }
`;

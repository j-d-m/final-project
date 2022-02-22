import { gql } from "@apollo/client";

//user query
export const GET_ONE_USER = gql`
  query GetOneUser($getOneUserId: ID) {
    getOneUser(id: $getOneUserId) {
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
//company query
export const GET_ONE_COMPANY = gql`
  query GetOneCompany($getOneCompanyId: ID) {
    getOneCompany(id: $getOneCompanyId) {
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

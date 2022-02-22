import { gql } from "@apollo/client";

//user query
export const GET_ONE_USER = gql`
<<<<<<< HEAD
  query GetOneUser($getOneUserId: ID) {
    getOneUser(id: $getOneUserId) {
=======
  query GetOneUser {
    getOneUser(id: "") {
>>>>>>> 2c5a9837be2b08fece3432ed4adefbb507842140
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
<<<<<<< HEAD
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
=======
>>>>>>> 2c5a9837be2b08fece3432ed4adefbb507842140

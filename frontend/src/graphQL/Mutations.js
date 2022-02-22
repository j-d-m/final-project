import { gql } from "@apollo/client";
//add company
export const ADD_COMPANY = gql`
  mutation AddCompany(
    $company_name: String!
    $owner_name: String!
    $company_type: String!
    $address: String!
    $phone: String!
    $email: String!
    $password: String!
    $repeatPassword: String!
    $description: String!
  ) {
    addCompany(
      company_name: $company_name
      owner_name: $owner_name
      company_type: $company_type
      address: $address
      phone: $phone
      email: $email
      password: $password
      repeatPassword: $repeatPassword
      description: $description
    ) {
      company_name
      owner_name
      company_type
      address
      phone
      email
      password
      repeatPassword
      description
    }
  }
`;
//login as user
export const USER_LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
//login as company
export const COMPANY_LOGIN = gql`
  mutation LoginCompany($email: String!, $password: String!) {
    loginCompany(email: $email, password: $password) {
      companyId
      token
      tokenExpiration
    }
  }
`;

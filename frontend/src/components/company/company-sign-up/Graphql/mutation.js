import { gql } from "@apollo/client";

export const CREATE_COMPANY_MUTATION = gql`
  mutation addCompany(
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
    }
  }
`;

import { gql } from "@apollo/client";
//COMPANY MUTATIONS
//add company
export const CREATE_COMPANY_MUTATION = gql`
  mutation AddCompany(
    $company_Name: String!
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
      company_Name: $company_Name
      owner_name: $owner_name
      company_type: $company_type
      address: $address
      phone: $phone
      email: $email
      password: $password
      repeatPassword: $repeatPassword
      description: $description
    ) {
      company_Name
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
//Delete Company
export const DELETE_COMPANY = gql`
  mutation DeleteCompany($deleteCompanyId: ID) {
    deleteCompany(id: $deleteCompanyId) {
      company_Name
    }
  }
`;
//update Company
export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $updateCompanyId: ID!
    $companyName: String
    $ownerName: String
    $avatar: String
    $companyType: String
    $address: String
    $phone: String
    $email: String
    $password: String
    $description: String
  ) {
    updateCompany(
      id: $updateCompanyId
      company_Name: $companyName
      owner_name: $ownerName
      avatar: $avatar
      company_type: $companyType
      address: $address
      phone: $phone
      email: $email
      password: $password
      description: $description
    ) {
      id
      company_Name
      owner_name
      avatar
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

//add user
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
//Delete User
export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId) {
      id
      first_name
      last_name
    }
  }
`;
//Delete User
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $firstName: String
    $lastName: String
    $avatar: String
    $email: String
    $password: String
    $phone: String
    $hourlyRate: Int
    $description: String
  ) {
    updateUser(
      id: $updateUserId
      first_name: $firstName
      last_name: $lastName
      avatar: $avatar
      email: $email
      password: $password
      phone: $phone
      hourly_rate: $hourlyRate
      description: $description
    ) {
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
//Job Mutations
export const CREATE_JOB = gql`
  mutation AddJob(
    $jobTitle: String!
    $companyName: String!
    $date: String!
    $numOfPeopleNeeded: Int!
    $jobDescription: String!
    $createdBy: ID!
  ) {
    addJob(
      job_Title: $jobTitle
      company_Name: $companyName
      date: $date
      num_of_people_needed: $numOfPeopleNeeded
      job_description: $jobDescription
      created_by: $createdBy
    ) {
      id
      job_Title
      company_Name
      date
      num_of_people_needed
      job_description
    }
  }
`;

//Delete User
export const DELETE_JOB = gql`
  mutation DeleteJob($deleteJobId: ID) {
    deleteJob(id: $deleteJobId) {
      job_Title
    }
  }
`;

//Delete User
export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $updateJobId: ID!
    $jobTitle: String
    $companyName: String
    $date: String
    $numOfPeopleNeeded: Int
    $jobDescription: String
    $createdBy: String
  ) {
    updateJob(
      id: $updateJobId
      job_Title: $jobTitle
      company_Name: $companyName
      date: $date
      num_of_people_needed: $numOfPeopleNeeded
      job_description: $jobDescription
      created_by: $createdBy
    ) {
      id
      job_Title
      company_Name
      date
      num_of_people_needed
      job_description
    }
  }
`;

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
      description: $description
    ) {
      company_Name
      owner_name
      company_type
      address
      phone
      email
      password
      description
    }
  }
`;
//login as company
export const COMPANY_LOGIN = gql`
  mutation LoginCompany($email: String!, $password: String!) {
    loginCompany(email: $email, password: $password) {
      token
      tokenExpiration
      company {
        id
        company_Name
        owner_name
        avatar
        company_type
        address
        phone
        email
        description
        jobs {
          id
          job_Title
          num_of_people_needed
          job_description
          issued_At
          start_Date
          end_Date
        }
      }
    }
  }
`;
//Delete Company
export const DELETE_COMPANY = gql`
  mutation DeleteCompany($deleteCompanyId: ID) {
    deleteCompany(id: $deleteCompanyId) {
      success
    }
  }
`;
//update Company
export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $updateCompanyId: ID!
    $companyName: String
    $ownerName: String
    $file: Upload
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
      file: $file
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
    $hourly_rate: Int!
    $description: String!
  ) {
    addUser(
      first_name: $first_name
      last_name: $last_name
      phone: $phone
      email: $email
      password: $password
      hourly_rate: $hourly_rate
      description: $description
    ) {
      id
    }
  }
`;

//login as user
export const USER_LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      tokenExpiration
      user {
        first_name
        last_name
        avatar
        email
        phone
        password
        hourly_rate
        description
        id
        favorite {
          job_Title
          start_Date
          end_Date
          num_of_people_needed
        }
      }
    }
  }
`;
//Delete User
export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId) {
      success
    }
  }
`;
//Delete User
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $firstName: String
    $lastName: String
    $file: Upload
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
      file: $file
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
      hourly_rate
      description
    }
  }
`;
//Job Mutations
export const CREATE_JOB = gql`
  mutation AddJob(
    $jobTitle: String!
    $startDate: String!
    $endDate: String!
    $numOfPeopleNeeded: Int!
    $jobDescription: String!
    $createdBy: ID!
  ) {
    addJob(
      job_Title: $jobTitle
      start_Date: $startDate
      end_Date: $endDate
      num_of_people_needed: $numOfPeopleNeeded
      job_description: $jobDescription
      created_by: $createdBy
    ) {
      job_Title
      start_Date
      end_Date
      num_of_people_needed
      job_description
      created_by {
        company_Name
      }
    }
  }
`;

//Delete User
export const DELETE_JOB = gql`
  mutation DeleteJob($deleteJobId: ID) {
    deleteJob(id: $deleteJobId) {
      success
    }
  }
`;

//Delete User
export const UPDATE_JOB = gql`
  mutation UpdateJob(
    $updateJobId: ID!
    $jobTitle: String
    $startDate: String
    $endDate: String
    $numOfPeopleNeeded: Int
    $jobDescription: String
  ) {
    updateJob(
      id: $updateJobId
      job_Title: $jobTitle
      start_Date: $startDate
      end_Date: $endDate
      num_of_people_needed: $numOfPeopleNeeded
      job_description: $jobDescription
    ) {
      id
      job_Title
      start_Date
      end_Date
      num_of_people_needed
      job_description
    }
  }
`;

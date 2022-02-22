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
export const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      id
      company_name
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
//job queries
export const GET_ONE_JOB = gql`
  query GetOneJob($getOneJobId: ID) {
    getOneJob(id: $getOneJobId) {
      id
      job_Title
      company_Name
      date
      num_of_people_needed
      job_description
    }
  }
`;
export const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      id
      job_Title
      company_Name
      date
      num_of_people_needed
      job_description
    }
  }
`;

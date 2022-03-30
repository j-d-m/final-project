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
      hourly_rate
      description
      favorite {
        id
        job_Title
        job_description
        end_Date
        start_Date
      }
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
      hourly_rate
      description
      favorite {
        id
        job_Title
        job_description
        end_Date
        start_Date
      }
    }
  }
`;
//company query
export const GET_ONE_COMPANY = gql`
  query GetOneCompany($getOneCompanyId: ID) {
    getOneCompany(id: $getOneCompanyId) {
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
      favorite {
        id
        first_name
        last_name
        avatar
        email
        description
      }
      jobs {
        id
        job_Title
        start_Date
        end_Date
        num_of_people_needed
        job_description
      }
    }
  }
`;
export const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
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
      favorite {
        id
        first_name
        last_name
        avatar
        email
        description
      }
      jobs {
        id
        job_Title
        start_Date
        end_Date
        num_of_people_needed
        job_description
      }
    }
  }
`;
//job queries
export const GET_ONE_JOB = gql`
  query GetOneJob($getOneJobId: ID) {
    getOneJob(id: $getOneJobId) {
      id
      job_Title
      issued_At
      num_of_people_needed
      job_description
      created_by {
        company_Name
        email
        avatar
      }
    }
  }
`;
export const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      id
      job_Title
      start_Date
      end_Date
      issued_At
      num_of_people_needed
      job_description
      created_by {
        company_Name
        email
        avatar
      }
    }
  }
`;

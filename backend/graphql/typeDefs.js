const { gql } = require("apollo-server");

const typeDefs = gql`
  # user type
  type UserType {
    id: ID
    first_name: String!
    last_name: String!
    avatar: String
    email: String!
    phone: String!
    password: String!
    repeatPassword: String!
    hourly_rate: Int
    description: String!
  }
  # company type
  type CompanyType {
    id: ID
    company_name: String!
    owner_name: String!
    avatar: String
    company_type: String!
    address: String!
    phone: String!
    email: String!
    password: String!
    repeatPassword: String!
    description: String!
    jobs: [JobType]
  }

  # job type
  type JobType {
    id: ID
    job_Title: String!
    company_Name: String!
    date: String!
    num_of_people_needed: Int!
    job_description: String!
    created_by: CompanyType
  }
  type Query {
    # login user
    # loginUser(email:string!,password:string!)
    # user Query
    getUsers: [UserType]
    getOneUser(id: ID): UserType
    # company Query
    getCompanies: [CompanyType]
    getOneCompany(id: ID): CompanyType
    # job Query
    getJobs: [JobType]
    getOneJob(id: ID): JobType
  }
  type Mutation {
    # user Mutation

    addUser(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
      repeatPassword: String!
      phone: String!
      hourly_rate: Int
      description: String!
    ): UserType
    deleteUser(id: ID): UserType
    updateUser(
      id: ID!
      first_name: String
      last_name: String
      avatar: String
      email: String
      password: String
      phone: String
      hourly_rate: Int
      description: String
    ): UserType
    # Company Mutation
    addCompany(
      company_name: String!
      owner_name: String!
      avatar: String
      company_type: String!
      address: String!
      phone: String!
      email: String!
      password: String!
      repeatPassword: String!
      description: String!
    ): CompanyType
    deleteCompany(id: ID): CompanyType
    updateCompany(
      id: ID!
      company_name: String
      owner_name: String
      avatar: String
      company_type: String
      address: String
      phone: String
      email: String
      password: String
      description: String
    ): CompanyType
    # job Mutation
    addJob(
      id: ID
      job_Title: String!
      company_Name: String!
      date: String!
      num_of_people_needed: Int!
      job_description: String!
      created_by: ID!
    ): JobType
    deleteJob(id: ID): JobType
    updateJob(
      id: ID!
      job_Title: String
      company_Name: String
      date: String
      num_of_people_needed: Int
      job_description: String
      created_by: String
    ): JobType
  }
`;
module.exports = { typeDefs };

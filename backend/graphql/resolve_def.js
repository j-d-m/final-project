const { gql } = require("apollo-server");
const UserCollection = require("../models/userSchema");
const bcrypt = require("bcrypt");
const CompanyCollection = require("../models/companySchema");
const JobCollection = require("../models/jobSchema");

const typeDefs = gql`
  # user type
  type UserType {
    id: ID
    first_name: String!
    last_name: String!
    avatar: String
    email: String!
    phone: Int
    password: String!
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
    phone: Int
    email: String!
    password: String!
    repeatPassword: String!
    description: String!
    job: [JobType]
  }
  # job type
  type JobType {
    id: ID
    job_Title: String!
    company_Name: String!
    date: String!
    num_of_people_needed: Int!
    job_description: String!
    created_bY: String!
  }
  type Query {
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
      phone: Int
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
      phone: Int
      hourly_rate: Int
      description: String
    ): UserType
    # Company Mutation
    addCompany(
      id: ID
      company_name: String!
      owner_name: String!
      avatar: String
      company_type: String!
      address: String!
      phone: Int
      email: String!
      password: String!
      repeatPassword: String!
      description: String!
    ): CompanyType
    deleteCompany(id: ID): CompanyType
    updateCompany(
      id: ID
      company_name: String
      owner_name: String
      avatar: String
      company_type: String
      address: String
      phone: Int
      email: String
      password: String
      repeatPassword: String
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
      created_bY: String!
    ): JobType
    deleteJob(id: ID): JobType
    updateJob(
      job_Title: String!
      company_Name: String!
      date: String!
      num_of_people_needed: Int!
      job_description: String!
      created_bY: String
    ): JobType
  }
`;

const resolvers = {
  Query: {
    // user queries
    getUsers: async () => {
      const getAllUsers = await UserCollection.find({});
      if (getAllUsers) {
        return getAllUsers;
      } else {
        throw new Error("no users found");
      }
    },
    async getOneUser(_, { id }) {
      const getUser = await UserCollection.findById(id);
      if (getUser) {
        return getUser;
      } else {
        throw new Error("no user found");
      }
    },
    // company queries
    getCompanies: async () => {
      const getAllCompanies = await CompanyCollection.find({});
      if (getAllCompanies) {
        return getAllCompanies;
      } else {
        throw new Error("no companies found");
      }
    },
    async getOneCompany(_, { id }) {
      const getCompany = await CompanyCollection.findById(id);
      if (getCompany) {
        return getCompany;
      } else {
        throw new Error("no company found");
      }
    },
    // job queries
    getJobs: async () => {
      const getAllJobs = await JobCollection.find({});
      if (getAllJobs) {
        return getAllJobs;
      } else {
        throw new Error("no jobs found");
      }
    },
    async getOneJob(_, { id }) {
      const getJob = await JobCollection.findById(id);
      if (getJob) {
        return getJob;
      } else {
        throw new Error("no job found");
      }
    },
  },
  Mutation: {
    // company Mutation
    async addCompany(_, args) {
      const findCompany = await CompanyCollection.findOne({
        email: args.email,
      });
      if (!findCompany) {
        if (args.password == args.repeatPassword) {
          const hashedPassword = bcrypt.hashSync(args.password, 10);
          args.password = hashedPassword;
          const createCompany = new CompanyCollection(args);
          return await createCompany.save();
        } else {
          throw new Error("password not matches repeat Password");
        }
      } else {
        throw new Error("Company already exist");
      }
    },
    async updateCompany(_, args) {
      const updateCompany = await CompanyCollection.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      );

      return updateCompany;
    },
    async deleteCompany(_, args) {
      const deleteCompany = await CompanyCollection.findByIdAndDelete(args.id);
      return deleteCompany;
    },
    // user Mutation

    async addUser(_, args) {
      const findUser = await UserCollection.findOne({ email: args.email });
      if (!findUser) {
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        args.password = hashedPassword;
        const createUser = new UserCollection(args);
        return await createUser.save();
      } else {
        throw new Error("error creating user");
      }
    },
    async updateUser(_, args) {
      const updateUser = await UserCollection.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      );

      return updateUser;
    },
    async deleteUser(_, args) {
      const deleteUser = await UserCollection.findByIdAndDelete(args.id);
      return deleteUser;
    },
    // job Mutation
    async addJob(_, args) {
      const createJob = new JobCollection(args);
      console.log("====================================");
      console.log(createJob);
      console.log("====================================");
      return await createJob.save();
    },
    async updateJob(_, args) {
      const updateJob = await JobCollection.findByIdAndUpdate(
        args.id,
        { ...args },
        { new: true }
      );
      return updateJob;
    },
    async deleteJob(_, args) {
      const deleteJob = await JobCollection.findByIdAndDelete(args.id);
      return deleteJob;
    },
  },
};
module.exports = { typeDefs, resolvers };

const UserCollection = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CompanyCollection = require("../models/companySchema");
const JobCollection = require("../models/jobSchema");
// const { makeExecutableSchema } = require("graphql-tools");
// const ConstraintDirective = require("graphql-constraint-directive");
const Joi = require("@hapi/joi");
const { UserInputError } = require("apollo-server");
const { isError } = require("@hapi/joi");
const resolvers = {
  Query: {
    // user queries
    getUsers: async (_, args, context) => {
      console.log("====================================");
      console.log(context);
      console.log("====================================");
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
    //user login
    async loginUser(_, { email, password }) {
      const user = await UserCollection.findOne({ email: email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect");
      }
      //if everything is ok. lets create token and install jsonwebtoken to generate json web token
      //to return to the frontend
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesupersecretkey"
        //to keep the token short is best option
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    },

    // company queries
    getCompanies: async () => {
      const getAllCompanies = await CompanyCollection.find().populate("jobs");

      if (getAllCompanies) {
        return getAllCompanies;
      } else {
        throw new Error("no companies found");
      }
    },
    async getOneCompany(_, { id }) {
      const getCompany = await CompanyCollection.findById(id).populate("jobs");
      if (getCompany) {
        return getCompany;
      } else {
        throw new Error("no company found");
      }
    },

    // job queries
    getJobs: async () => {
      const getAllJobs = await JobCollection.find({}).populate("created_by");

      if (getAllJobs) {
        return getAllJobs;
      } else {
        throw new Error("no jobs found");
      }
    },
    async getOneJob(_, { id }) {
      const getJob = await JobCollection.findById(id).populate("created_by");
      if (getJob) {
        return getJob;
      } else {
        throw new Error("no job found");
      }
    },
  },
  Mutation: {
    // company Mutation
    async addCompany(_, args, context) {
      // console.log(context);
      // if (!context.isAuth) {
      //   throw new Error("Unauthenticated!");
      // }
      const schema = Joi.object({
        company_name: Joi.string().min(2).max(50).required(),
        owner_name: Joi.string().min(2).max(50).required(),
        company_type: Joi.string().min(2).max(50).required(),
        address: Joi.string().min(2).max(50).required(),
        phone: Joi.string().pattern(/^[0-9\+]{1,}[0-9\-]{3,15}$/),
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/
        ),
        repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
        description: Joi.string().min(5).max(150).required(),
      });
      const { value, error } = schema.validate(args, { abortEarly: false });

      if (error) {
        throw new UserInputError(
          error.details.map((item) => {
            if (item.message.includes("required pattern")) {
              item.message = `Your password should have minimum 5 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character:`;
            } else {
              return item.message;
            }
          }),
          {
            validationError: error.details,
          }
        );
      }
      const findCompany = await CompanyCollection.findOne({
        email: args.email,
      });
      if (!findCompany) {
        // if (args.password == args.repeatPassword) {
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        args.password = hashedPassword;
        const createCompany = new CompanyCollection(args);
        return await createCompany.save();
        // } else {
        //   throw new Error("password not matches repeat Password");
        // }
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
      const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        phone: Joi.string().pattern(/^[0-9\+]{1,}[0-9\-]{3,15}$/),
        password: Joi.string().regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/
        ),
        repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
        hourly_rate: Joi.number(),
        description: Joi.string().min(5).max(150).required(),
      });
      const { value, error } = schema.validate(args, { abortEarly: false });
      if (error) {
        throw new UserInputError(
          error.details.map((item) => {
            if (item.message.includes("required pattern")) {
              item.message = `Your password should have minimum 5 and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character:`;
            } else {
              return item.message;
            }
          }),
          {
            validationError: error.details,
          }
        );
      }
      const findUser = await UserCollection.findOne({ email: args.email });
      if (!findUser) {
        // if (args.password === args.repeatPassword) {
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        args.password = hashedPassword;
        const createUser = new UserCollection(args);
        return await createUser.save();
        // } else {
        //   throw new Error("your password is not matching repeat password");
        // }
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
      await createJob.save();
      // we need to store the job in the database
      const company = await CompanyCollection.findById(args.created_by);
      //!  then we need to find the company that created this job using
      //!   the id for the company we receive it from args when we create the job
      company.jobs.push(createJob._id);
      await company.save();

      return createJob;
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
module.exports = { resolvers };

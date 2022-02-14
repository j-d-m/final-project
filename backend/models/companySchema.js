const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  company_name: { type: String, required: true },
  owner_name: { type: String, required: true },
  avatar: {
    type: String,
    default: function () {
      return `https://source.unsplash.com/1600x900/?${this.company_name}`;
    },
  },
  company_type: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number },
  email: { type: String, required: true },
  password: { type: String, required: true },
  repeatPassword: { type: String, required: true },
  description: { type: String, required: true },
});
const CompanyCollection = mongoose.model("company", companySchema);
module.exports = CompanyCollection;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  job_Title: { type: String, required: true },
  company_Name: { type: String, required: true },
  date: { type: String, required: true },
  num_of_people_needed: { type: Number, required: true },
  job_description: { type: String, required: true },
  created_bY: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
});
const JobCollection = mongoose.model("jobs", jobSchema);
module.exports = JobCollection;

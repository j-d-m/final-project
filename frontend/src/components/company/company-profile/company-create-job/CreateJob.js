import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { MyContext } from "../../../../Context/Context";
import { CREATE_JOB } from "../../../../graphQL/Mutations";
import Swal from "sweetalert2";

function CreateJob() {
  const { companyLoginData } = useContext(MyContext);
  const [addJob, { data, loading, error }] = useMutation(CREATE_JOB);

  const addJobProfile = (e) => {
    e.preventDefault();
    addJob({
      variables: {
        jobTitle: e.target.jobTitle.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
        numOfPeopleNeeded: Number(e.target.numOfPeopleNeeded.value),
        jobDescription: e.target.jobDescription.value,
        createdBy: companyLoginData?.companyId,
      },
    }).then((res) => {
      // setCompanyLoginData(res.data.loginCompany);
      if (companyLoginData) {
        // navigate("/");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Job created successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={addJobProfile} className="w-75 m-auto">
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            // ref={(value) => (jobTitle = value)}
            name="jobTitle"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            // ref={(value) => (date = value)}
            name="startDate"
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            // ref={(value) => (date = value)}
            name="endDate"
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">number of people</label>
          <input
            // ref={(value) => (numOfPeopleNeeded = value)}
            name="numOfPeopleNeeded"
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-outline">
          <textarea
            // onChange={message}
            name="jobDescription"
            className="form-control"
            rows="8"
            cols="60"
          />
          <label className="form-label">Message</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateJob;

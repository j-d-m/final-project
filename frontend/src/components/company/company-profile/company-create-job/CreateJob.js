import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { MyContext } from "../../../../Context/Context";
import { CREATE_JOB } from "../../../../graphQL/Mutations";
import Swal from "sweetalert2";
import { GET_JOBS } from "../../../../graphQL/Queries";
import { useNavigate } from "react-router-dom";
function CreateJob() {
  const navigate = useNavigate();
  const { companyLoginData } = useContext(MyContext);
  const [addJob, { data, loading, error }] = useMutation(CREATE_JOB, {
    refetchQueries: [{ query: GET_JOBS }],
    awaitRefetchQueries: true,
  });
  const addJobProfile = (e) => {
    e.preventDefault();
    addJob({
      variables: {
        jobTitle: e.target.jobTitle.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
        numOfPeopleNeeded: Number(e.target.numOfPeopleNeeded.value),
        jobDescription: e.target.jobDescription.value,
        createdBy: companyLoginData.id,
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Job created successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate("/company-profile");
        }, 2000);
      }
      if (error) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "something went wrong",
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
            name="jobTitle"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input name="startDate" type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input name="endDate" type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">number of people</label>
          <input
            name="numOfPeopleNeeded"
            type="number"
            className="form-control"
          />
        </div>
        <div className="form-outline">
          <textarea
            name="jobDescription"
            className="form-control"
            rows="8"
            cols="60"
            maxLength={500}
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

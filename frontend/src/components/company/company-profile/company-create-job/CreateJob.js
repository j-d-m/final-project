//Native Imports
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";


//External Imports
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

//Internal Imports
import { MyContext } from "../../../../Context/Context";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../../graphQL/Queries";
import { CREATE_JOB } from "../../../../graphQL/Mutations";
import hiring from "../../../../assets/img/hiring.svg"
import "../../../../styles/createJobs.scss"

function CreateJob(props) {
  const navigate = useNavigate();
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);

  const [addJob, { data, loading, error }] = useMutation(CREATE_JOB, {
    refetchQueries: [
      { query: GET_JOBS },
      {
        query: GET_ONE_COMPANY,
        variables: { getOneCompanyId: companyLoginData.id },
      },
    ],
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
        let companyUpdatedLoginData = {
          ...companyLoginData,
          jobs: res.data.CreateJob,
        };

        setCompanyLoginData(companyUpdatedLoginData);
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
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header
          closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100" >
            <div className="create-jobs-title d-flex align-items-center justify-content-around">
              <h3>Post a job offer </h3>
              <img alt="" src={hiring} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <label className="form-label">Amount of People Needed</label>
              <input
                name="numOfPeopleNeeded"
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-outline">
              <label className="form-label">Job Description</label>
              <textarea
                name="jobDescription"
                className="form-control"
                rows="8"
                cols="60"
                maxLength={500}
              />
            </div>
            <Modal.Footer className="modal-footer border-0">
              <input type="submit" value="Submit" className="btn btn-secondary mt-3" />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div >
  );
}
export default CreateJob;

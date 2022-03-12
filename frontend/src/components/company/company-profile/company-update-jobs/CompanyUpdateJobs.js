import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { UPDATE_JOB } from "../../../../graphQL/Mutations";
import { MyContext } from "../../../../Context/Context";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../../graphQL/Queries";

function CompanyUpdateJobs(props) {
  const { companyLoginData, setCompanyLoginData, oneCompanyJob } =
    useContext(MyContext);

  const [UpdateJob, { data, loading, error }] = useMutation(UPDATE_JOB, {
    refetchQueries: [
      { query: GET_JOBS },
      {
        query: GET_ONE_COMPANY,
        variables: { getOneCompanyId: companyLoginData.id },
      },
    ],
    awaitRefetchQueries: true,
  });
  const updateJobs = (e) => {
    e.preventDefault();
    let jobTitle, startDate, endDate, numOfPeopleNeeded, jobDescription;
    if (
      e.target.jobTitle.value !== undefined &&
      e.target.jobTitle.value !== ""
    ) {
      jobTitle = e.target.jobTitle.value;
    } else if (
      e.target.startDate.value !== undefined &&
      e.target.startDate.value !== ""
    ) {
      startDate = e.target.startDate.value;
    } else if (
      e.target.endDate.value !== undefined &&
      e.target.endDate.value !== ""
    ) {
      endDate = e.target.endDate.value;
    } else if (
      e.target.numOfPeopleNeeded.value !== undefined &&
      e.target.numOfPeopleNeeded.value !== ""
    ) {
      numOfPeopleNeeded = Number(e.target.numOfPeopleNeeded.value);
    } else if (
      e.target.jobDescription.value !== undefined &&
      e.target.jobDescription.value !== ""
    ) {
      jobDescription = e.target.jobDescription.value;
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "nothing change",
        showConfirmButton: false,
        timer: 1000,
      });
      return props.onHide();
    }

    props.onHide();
    UpdateJob({
      variables: {
        updateJobId: oneCompanyJob.id,
        jobTitle: jobTitle,
        startDate: startDate,
        endDate: endDate,
        numOfPeopleNeeded: numOfPeopleNeeded,
        jobDescription: jobDescription,
      },
    }).then((res) => {
      if (res.data) {
        let companyUpdatedLoginData = {
          ...companyLoginData,
          jobs: companyLoginData.jobs.map((job) => {
            if (job.id === res.data.updateJob.id) {
              return res.data.updateJob;
            } else {
              return job;
            }
          }),
        };

        setCompanyLoginData(companyUpdatedLoginData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "job updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
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
      <Modal {...props} size="lg" centered className="ProfileUpdate">
        <Modal.Body className="modalBody">
          <form className="modalForm" onSubmit={updateJobs}>
            <div className="modalDiv">
              <div>
                <label>Job Title :</label>
                <input
                  type="text"
                  name="jobTitle"
                  placeholder={oneCompanyJob.job_Title}
                />
              </div>
              <div>
                <label>Start Date :</label>
                <input
                  type="text"
                  name="startDate"
                  placeholder={oneCompanyJob.start_Date}
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label>End Date :</label>
                <input
                  type="text"
                  name="endDate"
                  placeholder={oneCompanyJob.end_Date}
                />
              </div>
              <div>
                <label>People Needed :</label>
                <input
                  type="number"
                  name="numOfPeopleNeeded"
                  placeholder={oneCompanyJob.num_of_people_needed}
                />
              </div>
            </div>

            <div className="textInput">
              <label> Job Description :</label>
              <textarea
                name="jobDescription"
                cols="22"
                rows="5"
                placeholder={oneCompanyJob.job_description}
              />
            </div>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
              <input type="submit" value="Save" className="btn btn-primary" />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CompanyUpdateJobs;

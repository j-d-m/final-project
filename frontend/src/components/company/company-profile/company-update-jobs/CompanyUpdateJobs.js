import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { UPDATE_JOB } from "../../../../graphQL/Mutations";
import { MyContext } from "../../../../Context/Context";

function CompanyUpdateJobs(props) {
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);

  const [UpdateJob, { data, loading, error }] = useMutation(UPDATE_JOB);

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
        updateJobId: props.job,
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
                <input type="text" name="jobTitle" />
              </div>
              <div>
                <label>Start Date :</label>
                <input type="text" name="startDate" />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label>End Date :</label>
                <input type="text" name="endDate" />
              </div>
              <div>
                <label>People Needed :</label>
                <input type="number" name="numOfPeopleNeeded" />
              </div>
            </div>

            <div className="textInput">
              <label> Job Description :</label>
              <textarea name="jobDescription" cols="22" rows="5" />
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


//Native Imports
import React, { useContext } from "react";

//External Imports
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

// import "bootstrap/dist/css/bootstrap.min.css";

//Internal Imports
import { UPDATE_JOB } from "../../../../graphQL/Mutations";
import { MyContext } from "../../../../Context/Context";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../../graphQL/Queries";
import hotPan from "../../../../assets/img/hotPan.svg"
import "../../../../styles/companyJobs.scss"


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
      <Modal
        {...props}
        size="lg"
        centered
        className="ProfileUpdate jobsAdminModalBg "
      >
        <Modal.Header
          closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100" >
            <div className="update-jobs-title d-flex align-items-center justify-content-around">
              <h3>Update Job Post  </h3>
              <img alt="" src={hotPan} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>



        <Modal.Body className="modalBody">
          <form className="container modalForm" onSubmit={updateJobs}>
            <div className="modalDiv form-group">
              <div>
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  className="form-control"
                  type="text"
                  name="jobTitle"
                  placeholder={oneCompanyJob.job_Title}
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div>
                <label htmlFor="peopleNeeded" >People Needed</label>
                <input
                  id="peopleNeeded"
                  className="form-control"
                  type="number"
                  name="numOfPeopleNeeded"
                  placeholder={oneCompanyJob.num_of_people_needed}
                />
              </div>
            </div>

            <div className="modalDiv">
              <div>
                <label htmlFor="inputTwo2">Start Date</label>
                <input
                  id="startDate"
                  className="form-control"
                  type="text"
                  name="startDate"
                  placeholder={oneCompanyJob.start_Date}
                />
              </div>
              <div>
                <label htmlFor="endDate" >End Date</label>
                <input
                  id="startDate"
                  className="form-control"
                  type="text"
                  name="endDate"
                  placeholder={oneCompanyJob.end_Date}
                />
              </div>

            </div>

            <div className="textInput">
              <label>Description</label>
              <textarea
                name="jobDescription"
                cols="60"
                rows="8"
                placeholder={oneCompanyJob.job_description}
                minLength="5"
                maxLength="500"
              />
            </div>
            <Modal.Footer className="modal-footer border-0">
              <input type="submit" value="Save" className="btn btn-secondary ps-3 pe-3" />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CompanyUpdateJobs;

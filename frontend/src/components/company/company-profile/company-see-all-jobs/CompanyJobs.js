//Native Imports
import React, { useContext, useState } from "react";

//External Imports
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

//Internal Imports
import { MyContext } from "../../../../Context/Context";
import CompanyUpdateJobs from "../company-update-jobs/CompanyUpdateJobs";
import DeleteJob from "./DeleteJob";
import luggageBoy from "../../../../assets/img/luggageBoy.svg";
import "../../../../styles/companyJobs.scss";

function CompanyJobs(props) {
  const [modalShowUpdate, setModalShowUpdate] = useState();
  const [modalShowDelete, setModalShowDelete] = useState();

  const { companyLoginData, setOneCompanyJob } = useContext(MyContext);
  const updateSingleJob = (id) => {
    let findOneJob = companyLoginData.jobs.find((item) => item.id === id);
    setOneCompanyJob(findOneJob);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100">
            <div className="admin-jobs-title d-flex align-items-center justify-content-around">
              <h3>Job Posts Admin </h3>
              <img alt="" src={luggageBoy} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="companyJobs">
            {companyLoginData.jobs &&
              companyLoginData.jobs.map((job) => {
                let {
                  id,
                  job_Title,
                  start_Date,
                  end_Date,
                  job_description,
                  num_of_people_needed,
                } = job;
                return (
                  <div className="jobsCard" key={id}>
                    <h4>{job_Title}</h4>
                    <div>
                      <p>{`To work from ${moment(start_Date)
                        .locale("en")
                        .format("ll")} til ${moment(end_Date)
                          .locale("en")
                          .format("ll")}.`}</p>
                      <p>{`${num_of_people_needed} people needed`}</p>
                      <p>
                        <strong> Description: </strong>
                        <span>
                          <em> {job_description}</em>
                        </span>
                      </p>
                      <div className="adminJobsButtons">
                        <Button
                          id={id}
                          variant="secondary"
                          onClick={() => {
                            setModalShowUpdate(true);
                            updateSingleJob(id);
                          }}
                        >
                          Edit
                        </Button>
                        <CompanyUpdateJobs
                          show={modalShowUpdate}
                          onHide={() => setModalShowUpdate(false)}
                        />
                        <Button
                          id={id}
                          className="btn-block btn-pepper"
                          onClick={() => {
                            setModalShowDelete(true);
                            updateSingleJob(id);
                          }}
                        >
                          Delete
                        </Button>
                        <DeleteJob
                          show={modalShowDelete}
                          onHide={() => setModalShowDelete(false)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Modal.Footer className="modal-footer border-0"></Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompanyJobs;

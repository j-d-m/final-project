//Native Imports
import React, { useContext } from "react";

//External imports
import { useMutation } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

//Internal Imports
import { MyContext } from "../../../../Context/Context";
import { DELETE_JOB } from "../../../../graphQL/Mutations";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../../graphQL/Queries";

function DeleteJob(props) {
  const { oneCompanyJob, companyLoginData, setCompanyLoginData } =
    useContext(MyContext);
  const [deleteJob, { data, loading, error }] = useMutation(DELETE_JOB, {
    refetchQueries: [
      { query: GET_JOBS },
      {
        query: GET_ONE_COMPANY,
        variables: { getOneCompanyId: companyLoginData.id },
      },
    ],
    awaitRefetchQueries: true,
  });

  const deleteOneJob = () => {
    deleteJob({
      variables: { deleteJobId: oneCompanyJob.id },
    }).then((res) => {
      if (res.data.deleteJob.success) {
        let companyUpdatedLoginData = {
          ...companyLoginData,
          jobs: companyLoginData.jobs.filter(
            (job) => job.id !== oneCompanyJob.id
          ),
        };
        setCompanyLoginData(companyUpdatedLoginData);

        props.onHide();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "job deleted successfully",
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
        size="m"
        centered
        className="companyProfileUpdate jobsAdminModalBg">
        <Modal.Body className="text-center">
          <h4>Delete Job Post</h4>
          <p>Are you sure? This action cannot be reverted.</p>

        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            variant="secondary"
            className="btn-block"
          >
            Close
          </Button>
          <Button
            className="btn-block btn-pepper"
            onClick={deleteOneJob}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteJob;

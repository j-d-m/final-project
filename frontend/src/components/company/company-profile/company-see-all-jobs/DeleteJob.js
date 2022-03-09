import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { DELETE_JOB } from "../../../../graphQL/Mutations";

function DeleteJob(props) {
  const [deleteJob, { data, loading, error }] = useMutation(DELETE_JOB);
  const deleteOneJob = () => {
    deleteJob({
      variables: { deleteJobId: props.job },
    }).then((res) => {
      console.log(res.data, "this is res");
      if (res.data.deleteJob.success) {
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
      <Modal {...props} size="lg" centered className="companyProfileUpdate">
        <Modal.Body className="text-center">
          <h4>Are you sure you want to Delete This Job</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input
            type="submit"
            value="Delete"
            className="btn btn-danger"
            onClick={deleteOneJob}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteJob;

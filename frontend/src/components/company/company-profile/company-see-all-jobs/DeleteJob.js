import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { MyContext } from "../../../../Context/Context";
import { DELETE_JOB } from "../../../../graphQL/Mutations";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../../graphQL/Queries";

function DeleteJob(props) {
  const { oneCompanyJob, companyLoginData } = useContext(MyContext);
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
      <Modal {...props} size="md" centered className="companyProfileUpdate">
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

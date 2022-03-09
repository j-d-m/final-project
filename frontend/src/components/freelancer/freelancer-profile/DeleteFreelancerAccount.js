import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { DELETE_USER } from "../../../graphQL/Mutations";

function DeleteFreelancerAccount(props) {
  const navigate = useNavigate();
  const { setFreelancerLoginData, freelancerLoginData, setIsFreelancerLogin } =
    useContext(MyContext);

  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER, {
    awaitRefetchQueries: true,
  });
  const deleteAccount = () => {
    deleteUser({
      variables: { deleteUserId: freelancerLoginData.id },
    }).then((res) => {
      if (res.data) {
        console.log(res.data.deleteUser);
        if (res.data.deleteUser.success) {
          navigate("/freelancer-login");
          props.onHide();
          setFreelancerLoginData(null);
          setIsFreelancerLogin(false);
        }
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
        <Modal.Body className="text-center">
          <h4>Are you sure you want to Delete your company account</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <input
            type="submit"
            value="Delete"
            className="btn btn-danger"
            onClick={deleteAccount}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteFreelancerAccount;

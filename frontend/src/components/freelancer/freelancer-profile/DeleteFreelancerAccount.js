//Native Import
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";

//External Import
import { useMutation } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

//Internal Import
import { MyContext } from "../../../Context/Context";
import { DELETE_USER } from "../../../graphQL/Mutations";
import hotelCheckout from "../../../assets/img/hotelCheckout.svg"


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
          <h4>Leaving us?</h4>
          <img alt="" src={hotelCheckout} width="150" height="150" className="" />
          <hr />
          <p> Are you sure you want to delete this FREELANCER account?</p>
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
            onClick={deleteAccount}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteFreelancerAccount;

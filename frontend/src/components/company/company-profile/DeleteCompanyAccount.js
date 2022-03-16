//Native Imports
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

//External Imports
import { useMutation } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

//Internal Imports
import { MyContext } from "../../../Context/Context";
import { DELETE_COMPANY } from "../../../graphQL/Mutations";
import hotelCheckout from "../../../assets/img/hotelCheckout.svg"

function DeleteCompanyAccount(props) {
  const navigate = useNavigate();
  const { companyLoginData, setCompanyLoginData, setIsCompanyLogin } =
    useContext(MyContext);

  const [deleteCompany, { data, loading, error }] = useMutation(DELETE_COMPANY);
  const deleteAccount = () => {
    deleteCompany({
      variables: { deleteCompanyId: companyLoginData.id },
    }).then((res) => {
      if (res.data.deleteCompany.success) {
        navigate("/company-login");
        props.onHide();
        setCompanyLoginData(null);
        setIsCompanyLogin(false);
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
      className="companyProfileUpdate">
        <Modal.Body className="text-center">
          <h4>Leaving us?  </h4>
          <img alt="" src={hotelCheckout} width="150" height="150" className="" />
          <hr />
          <p> Are you sure you want to delete this COMPANY account?</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer border-0" >
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

export default DeleteCompanyAccount;

import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { DELETE_COMPANY } from "../../../graphQL/Mutations";

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
      <Modal {...props} size="m" centered className="companyProfileUpdate">
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

export default DeleteCompanyAccount;

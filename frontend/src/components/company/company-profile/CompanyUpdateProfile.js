import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UPDATE_COMPANY } from "../../../graphQL/Mutations";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../graphQL/Queries";
function CompanyUpdateProfile(props) {
  const { companyLoginData } = useContext(MyContext);

  const [UpdateCompany, { data, loading, error }] = useMutation(
    UPDATE_COMPANY,
    {
      refetchQueries: [
        { query: GET_JOBS },
        {
          query: GET_ONE_COMPANY,
          variables: { getOneCompanyId: companyLoginData.id },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const updateProfile = (e) => {
    e.preventDefault();
    let companyName, owner, address, phone, email, password, description;
    if (
      e.target.companyName.value !== undefined &&
      e.target.companyName.value !== ""
    ) {
      companyName = e.target.companyName.value;
    } else if (
      e.target.owner.value !== undefined &&
      e.target.owner.value !== ""
    ) {
      owner = e.target.owner.value;
    } else if (
      e.target.email.value !== undefined &&
      e.target.email.value !== ""
    ) {
      email = e.target.email.value;
    } else if (
      e.target.password.value !== undefined &&
      e.target.password.value !== ""
    ) {
      password = e.target.password.value;
    } else if (
      e.target.address.value !== undefined &&
      e.target.address.value !== ""
    ) {
      address = e.target.address.value;
    } else if (
      e.target.phone.value !== undefined &&
      e.target.phone.value !== ""
    ) {
      phone = e.target.phone.value;
    } else if (
      e.target.description.value !== undefined &&
      e.target.description.value !== ""
    ) {
      description = e.target.description.value;
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
    UpdateCompany({
      variables: {
        updateCompanyId: companyLoginData.id,
        companyName: companyName,
        ownerName: owner,
        address: address,
        phone: phone,
        email: email,
        password: password,
        description: description,
        file: props.image,
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "profile updated successfully",
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
          <form className="modalForm" onSubmit={updateProfile}>
            <div className="modalDiv">
              <div>
                <label>Company Name :</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder={companyLoginData.company_Name}
                />
              </div>
              <div>
                <label>Owner :</label>
                <input
                  type="text"
                  name="owner"
                  placeholder={companyLoginData.owner_name}
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label>Email :</label>
                <input
                  type="email"
                  name="email"
                  placeholder={companyLoginData.email}
                />
              </div>
              <div>
                <label>Password :</label>
                <input
                  type="password"
                  name="password"
                  placeholder="your new password....."
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  placeholder={companyLoginData.address}
                />
              </div>
              <div>
                <label>Phone :</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={companyLoginData.phone}
                />
              </div>
            </div>
            <div className="textInput">
              <label>Description :</label>
              <textarea
                name="description"
                cols="22"
                rows="5"
                placeholder={companyLoginData.description}
              />
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

export default CompanyUpdateProfile;

//Native Imports
import React, { useContext } from "react";

//Externa Imports
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";

//Internal Imports
import { UPDATE_COMPANY } from "../../../graphQL/Mutations";
import { MyContext } from "../../../Context/Context";
import { GET_JOBS, GET_ONE_COMPANY } from "../../../graphQL/Queries";
import hotPan from "../../../assets/img/hotPan.svg";

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
    }
    if (e.target.owner.value !== undefined && e.target.owner.value !== "") {
      owner = e.target.owner.value;
    }
    if (e.target.email.value !== undefined && e.target.email.value !== "") {
      email = e.target.email.value;
    }
    if (
      e.target.password.value !== undefined &&
      e.target.password.value !== ""
    ) {
      password = e.target.password.value;
    }
    if (e.target.address.value !== undefined && e.target.address.value !== "") {
      address = e.target.address.value;
    }
    if (e.target.phone.value !== undefined && e.target.phone.value !== "") {
      phone = e.target.phone.value;
    }
    if (
      e.target.description.value !== undefined &&
      e.target.description.value !== ""
    ) {
      description = e.target.description.value;
    }
    if (
      companyName !== e.target.companyName.value &&
      owner !== e.target.owner.value &&
      address !== e.target.address.value &&
      phone !== e.target.phone.value &&
      email !== e.target.email.value &&
      password !== e.target.password.value &&
      description !== e.target.description.value
    ) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Nothing changed",
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
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (error) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div>
      <Modal {...props} size="lg" centered className="ProfileUpdate">
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100">
            <div className="update-jobs-title d-flex align-items-center justify-content-around">
              <h3>Update your profile </h3>
              <img alt="" src={hotPan} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <form className="container modalForm" onSubmit={updateProfile}>
            <div className="modalDiv form-group">
              <div>
                <label htmlFor="inputOne1">Company Name</label>
                <input
                  id="inputOne1"
                  className="form-control"
                  type="text"
                  name="companyName"
                  placeholder={companyLoginData.company_Name}
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div>
                <label htmlFor="inputTwo2">Contact Person</label>
                <input
                  id="inputTwo2"
                  className="form-control"
                  type="text"
                  name="owner"
                  placeholder={companyLoginData.owner_name}
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label htmlFor="inputThree3">Email</label>
                <input
                  id="inputThree3"
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder={companyLoginData.email}
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div>
                <label htmlFor="inputFour4">Password</label>
                <input
                  id="inputFour4"
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="your new password....."
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label htmlFor="inputFive5">Address</label>
                <input
                  id="inputFive5"
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder={companyLoginData.address}
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div>
                <label htmlFor="inputSix6">Phone</label>
                <input
                  id="inputSix6"
                  className="form-control"
                  type="tel"
                  name="phone"
                  placeholder={companyLoginData.phone}
                  // required
                  minLength="2"
                  maxLength="50"
                />
              </div>
            </div>
            <div className="textInput">
              <label>Description</label>
              <textarea
                name="description"
                cols="60"
                rows="8"
                placeholder={companyLoginData.description}
                // required
                minLength="5"
                maxLength="500"
              />
            </div>
            <Modal.Footer className="modal-footer border-0">
              <input
                type="submit"
                value="Save"
                className="btn btn-secondary ps-3 pe-3"
              />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CompanyUpdateProfile;

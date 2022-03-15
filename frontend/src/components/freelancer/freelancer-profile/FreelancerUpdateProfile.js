import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UPDATE_USER } from "../../../graphQL/Mutations";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { GET_ONE_USER } from "../../../graphQL/Queries";
function FreelancerUpdateProfile(props) {
  const { freelancerLoginData } = useContext(MyContext);

  const [UpdateUser, { data, loading, error }] = useMutation(UPDATE_USER, {
    refetchQueries: GET_ONE_USER,
    awaitRefetchQueries: true,
  });

  const updateProfile = (e) => {
    e.preventDefault();

    let firstName, lastName, hourlyRate, phone, email, password, description;
    if (
      e.target.firstName.value !== undefined &&
      e.target.firstName.value !== ""
    ) {
      firstName = e.target.firstName.value;
    }

    if (
      e.target.lastName.value !== undefined &&
      e.target.lastName.value !== ""
    ) {
      lastName = e.target.lastName.value;
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
    if (
      e.target.hourlyRate.value !== undefined &&
      e.target.hourlyRate.value !== ""
    ) {
      hourlyRate = Number(e.target.hourlyRate.value);
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
      firstName &&
      lastName &&
      hourlyRate &&
      phone &&
      email &&
      password &&
      description === undefined
    ) {
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
    UpdateUser({
      variables: {
        updateUserId: freelancerLoginData.id,
        firstName: firstName,
        lastName: lastName,
        hourlyRate: hourlyRate,
        phone: phone,
        email: email,
        password: password,
        description: description,
      },
    }).then((res) => {
      if (res.data) {
        console.log(res.data);
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
          <form className="container modalForm" onSubmit={updateProfile}>
            <div className="modalDiv form-group">
              <div>
                <label for="inputOne1">First Name :</label>
                <input
                  id="inputOne1"
                  className="form-control"
                  type="text"
                  name="firstName"
                  placeholder={freelancerLoginData.first_name}
                />
              </div>
              <div>
                <label for="inputTwo2">Last Name :</label>
                <input
                  id="inputTwo2"
                  className="form-control"
                  type="text"
                  name="lastName"
                  placeholder={freelancerLoginData.last_name}
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label for="inputThree3">Email :</label>
                <input
                  id="inputThree3"
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder={freelancerLoginData.email}
                />
              </div>
              <div>
                <label for="inputFour4">Password :</label>
                <input
                  id="inputFour4"
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="your new password...."
                />
              </div>
            </div>
            <div className="modalDiv">
              <div>
                <label for="inputFive5">hourly_rate:</label>
                <input
                  id="inputFive5"
                  className="form-control"
                  type="number"
                  name="hourlyRate"
                  placeholder={freelancerLoginData.hourly_rate}
                />
              </div>
              <div>
                <label for="inputSix6">Phone :</label>
                <input
                  id="inputSix6"
                  className="form-control"
                  type="tel"
                  name="phone"
                  placeholder={freelancerLoginData.phone}
                />
              </div>
            </div>
            <div className="textInput">
              <label>Description :</label>
              <textarea
                name="description"
                cols="22"
                rows="5"
                placeholder={freelancerLoginData.description}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <input type="submit" value="Save" className="btn btn-secondary" />
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FreelancerUpdateProfile;

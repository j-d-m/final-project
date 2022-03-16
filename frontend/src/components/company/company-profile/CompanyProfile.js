//Native Imports
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//External Imports
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import { Button } from "react-bootstrap";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { UPDATE_COMPANY } from "../../../graphQL/Mutations";
import Swal from "sweetalert2";

//Internal Imports
import { MyContext } from "../../../Context/Context";
import DeleteCompanyAccount from "./DeleteCompanyAccount";
import CompanyUpdateProfile from "./CompanyUpdateProfile";
import CompanyCreateJob from "../company-profile/company-create-job/CreateJob";
import "../../../styles/companyProfile.scss";
import CompanyJobs from "./company-see-all-jobs/CompanyJobs";

export default function CompanyProfile() {
  const navigate = useNavigate();
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);
  const [modalShowEdit, setModalShowEdit] = useState();
  const [modalShowDelete, setModalShowDelete] = useState();
  const [modalShowCreate, setModalShowCreate] = useState();
  const [modalShowJobsAdmin, setModalShowJobsAdmin] = useState();
  const [companyImage, setCompanyImage] = useState(null);
  const [UpdateCompany, { data1, loading1, error1 }] =
    useMutation(UPDATE_COMPANY);
  const updateAvatar = (e) => {
    e.preventDefault();
    UpdateCompany({
      variables: {
        updateCompanyId: companyLoginData.id,
        file: e.target.files[0],
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

  const { loading, error, data } = useQuery(GET_ONE_COMPANY, {
    variables: { getOneCompanyId: companyLoginData.id },
  });

  if (loading) {
    return (
      <div className="m2-auto text-center loading-block">
        <img
          src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
          alt="img"
        />
      </div>
    );
  }

  setTimeout(() => {
    if (data) {
      setCompanyLoginData(data.getOneCompany);
    }
  }, 100);

  return (
    <section className="Profile-Container-Comp">
      <div className="Banner-Container-Comp">
        {data &&
          (() => {
            let {
              id,
              company_Name,
              owner_name,
              address,
              company_type,
              description,
              email,
              phone,
              avatar,
            } = data.getOneCompany;
            return (
              <>
                <div className="Freelance-Avatar-Comp">
                  <img src={avatar} alt="img" width="200px" height="200px" />
                  <label htmlFor="file-upload" className="Custom-File-Upload">
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      onChange={updateAvatar}
                    />
                    Change Image
                  </label>
                </div>

                <div className="Freelance-Right-Comp">
                  <h1>{company_Name}</h1>

                  <div>
                    <p>Company type : {company_type} </p>
                  </div>
                  <div>
                    <p>Company address : {address} </p>
                  </div>
                  <div>
                    <p>Owner : {owner_name}</p>
                  </div>
                  <div>
                    <p>Email : {email}</p>
                  </div>
                  <div>
                    <p>Phone : {phone}</p>
                  </div>
                  <div>
                    <p>Company Description : {description} </p>
                  </div>
                  <section>
                    <div className="ModalBtnCompanyProfile">
                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShowEdit(true);
                        }}
                      >
                        <AiOutlineEdit />
                        <span>Edit</span>
                      </Button>
                      <CompanyUpdateProfile
                        show={modalShowEdit}
                        onHide={() => setModalShowEdit(false)}
                      />
                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShowDelete(true);
                        }}
                      >
                        <AiOutlineDelete />
                        <span>Delete</span>
                      </Button>

                      <DeleteCompanyAccount
                        show={modalShowDelete}
                        onHide={() => setModalShowDelete(false)}
                      />

                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShowCreate(true);
                        }}
                      >
                        <AiOutlinePlusCircle />
                        <span>Create</span>
                      </Button>

                      <CompanyCreateJob
                        show={modalShowCreate}
                        onHide={() => setModalShowCreate(false)}
                      // image={companyImage}
                      />

                      <Button
                        value="Check freelancers"
                        onClick={() => navigate("/freelancer-list")}
                        className="btn btn-secondary btn-circle btn-xl"
                      >
                        <GiCook />
                        <span>Staff</span>
                      </Button>
                      <Button
                        id={id}
                        className="btn btn-secondary btn-circle btn-xl"
                        onClick={() => {
                          setModalShowJobsAdmin(true);
                        }}
                      >
                        <AiOutlineUnorderedList />
                        <span>Jobs</span>
                      </Button>
                      <CompanyJobs
                        show={modalShowJobsAdmin}
                        onHide={() => setModalShowJobsAdmin(false)}
                      />

                    </div>
                  </section>
                </div>
              </>
            );
          })()}
      </div>
    </section>
  );
}

//Native Imports
import React, { useContext, useState } from "react";

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
import "../../../styles/companyProfile.scss";
import { MyContext } from "../../../Context/Context";
import DeleteCompanyAccount from "./DeleteCompanyAccount";
import CompanyUpdateProfile from "./CompanyUpdateProfile";
import CompanyCreateJob from "../company-profile/company-create-job/CreateJob";
import FreelancerHome from "../../home/FreelancerHome";
import CompanyJobs from "./company-see-all-jobs/CompanyJobs";
import { ImHeart } from "react-icons/im";
import CompanyShowFavList from "./CompanyShowFavList";

export default function CompanyProfile() {
  const { companyLoginData, setCompanyLoginData } = useContext(MyContext);
  const [modalShowEdit, setModalShowEdit] = useState();
  const [modalShowDelete, setModalShowDelete] = useState();
  const [modalShowCreate, setModalShowCreate] = useState();
  const [modalShowStaff, setModalShowStaff] = useState();
  const [modalShowFavorite, setModalShowFavorite] = useState();
  const [modalShowJobsAdmin, setModalShowJobsAdmin] = useState();

  const [UpdateCompany, { data1, loading1, error1 }] =
    useMutation(UPDATE_COMPANY);

  //Update Avatar function
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
          src="https://cdn.dribbble.com/users/924068/screenshots/3757746/media/6035d641a7d26f1ba75421d15ce173cf.gif"
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
              favorite,
            } = data.getOneCompany;
            return (
              <>
                <div className="BoxContainer">
                  <div className="Company-Avatar-Comp">
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

                  <div className="Company-Right-Comp">
                    <h1>{company_Name}</h1>

                    <div>
                      <p>
                        <span>Company Type</span>
                        <span>{company_type}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Company Address </span>
                        <span>{address}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Owner </span>
                        <span>{owner_name}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Email </span>
                        <span>{email}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span>Phone </span>
                        <span>{phone}</span>
                      </p>
                    </div>
                    <div>
                      <p className="Desc-comp">
                        <span>Company Description</span>
                        <span>{description}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <section className="BtnSection">
                  <div className="ModalBtnCompanyProfile">
                    {/* Show/Update favorite freelancer list */}
                    <Button
                      id={id}
                      className="btn btn-secondary btn-circle btn-xl"
                      onClick={() => {
                        setModalShowFavorite(true);
                      }}
                    >
                      <div className="FavoriteList">
                        <ImHeart />
                        <span>List</span>
                      </div>
                    </Button>
                    <CompanyShowFavList
                      favorite={favorite}
                      show={modalShowFavorite}
                      onHide={() => setModalShowFavorite(false)}
                    />
                    {/* Edit/Update Company Profile */}
                    <Button
                      id={id}
                      className="btn btn-secondary btn-circle btn-xl"
                      onClick={() => {
                        setModalShowEdit(true);
                      }}
                    >
                      <div className="EditBtn">
                        <AiOutlineEdit />
                        <span>Edit</span>
                      </div>
                    </Button>
                    <CompanyUpdateProfile
                      show={modalShowEdit}
                      onHide={() => setModalShowEdit(false)}
                    />

                    {/* Delete Company Profile */}
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

                    {/* Create/Post new Job Offer */}
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
                    />

                    {/* Check/visit Freelancer/staff available */}
                    <Button
                      id={id}
                      className="btn btn-secondary btn-circle btn-xl"
                      onClick={() => {
                        setModalShowStaff(true);
                      }}
                    >
                      <GiCook />
                      <span>Staff</span>
                    </Button>
                    <FreelancerHome
                      show={modalShowStaff}
                      onHide={() => setModalShowStaff(false)}
                    />

                    {/* Edit/Update/Admin Job offers Posted */}
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
              </>
            );
          })()}
      </div>
    </section>
  );
}

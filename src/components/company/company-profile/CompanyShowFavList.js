import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { MyContext } from "../../../Context/Context";
import { DELETE_COMPANY_FAVORITE } from "../../../graphQL/Mutations";
import { GET_ONE_COMPANY } from "../../../graphQL/Queries";
import favoriteIcon from "../../../assets/img/favorite.svg";

export default function CompanyShowFavList(props) {
  const { companyLoginData } = useContext(MyContext);
  const [deleteCompanyFavorite, { error }] = useMutation(
    DELETE_COMPANY_FAVORITE,
    {
      refetchQueries: [
        {
          query: GET_ONE_COMPANY,
          variables: { getOneCompanyId: companyLoginData.id },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const deleteFavoriteBtn = (id, first_name) => {
    deleteCompanyFavorite({
      variables: {
        userId: id,
        companyId: companyLoginData.id,
      },
    }).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: `you delete ${first_name} from your favorite list`,
          showConfirmButton: false,
          timer: 2000,
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
      <Modal {...props} size="lg" centered className="favoriteListCompany">
        <Modal.Header closeButton>
          <Modal.Title className="contained-modal-title-vcenter w-100">
            <div className="update-jobs-title d-flex align-items-center justify-content-around">
              <h3> Your Favorite Freelancers </h3>
              <img alt="" src={favoriteIcon} width="80" height="80" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.favorite.map((fav) => {
            let { first_name, last_name, avatar, email, description, id } = fav;
            return (
              <div className="Container" key={fav.id}>
                <div className="Card">
                  <div className="Box">
                    <div className="Content">
                      <img src={avatar} alt="img" width="100px" />
                      {/* <h2>01</h2> */}

                      <h3>{`${first_name}  ${last_name}`}</h3>
                      <button onClick={() => deleteFavoriteBtn(id, first_name)}>
                        {" "}
                        Remove from favorite list{" "}
                      </button>
                      <h6>{email}</h6>
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
}

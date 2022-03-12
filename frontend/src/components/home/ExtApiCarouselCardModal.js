//Native imports
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//External imports
import Button from "react-bootstrap/Button";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { AiOutlineArrowUp, AiOutlineFileText } from 'react-icons/ai';
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineToday } from "react-icons/md";


//Internal imports
import "../../styles/carousel.scss";
import { MyContext } from "../../Context/Context"




export default function ExtApiCarouselCardModal({ job }) {
    const navigate = useNavigate();
    const { isFreelancerLogin } = useContext(MyContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showUrl, setShowUrl] = useState(false);
    const toggleShowUrl = () => setShowUrl(!showUrl);

    function redirectToLogin() {
        navigate("/freelancer-login")
    }

    let CharLimitCompanyCarousel = 30;
    let CharLimitTitleCarousel = 20;

    let CharLimitCompanyModal = 50
    let CharLimitTitleModal = 100;
    let CharLimitDescriptionModal = 500;

    return (
        <div className="carousel-card">
            <h5>
                {" "}
                {job.title.slice(0, CharLimitTitleCarousel) +
                    (job.title.length > CharLimitTitleCarousel ? "..." : "")}
            </h5>
            <p> {job.location.display_name}</p>
            <p>posted {moment(job.created).fromNow()}</p>

            <p>
                by{" "}
                <strong>
                    {" "}
                    {job.company.display_name.slice(0, CharLimitCompanyCarousel) +
                        (job.company.display_name.length > CharLimitCompanyCarousel
                            ? "..."
                            : "")}{" "}
                </strong>
            </p>

            <div className="text-center">
                <Button
                    variant="secondary"
                    size="md"
                    onClick={handleShow}                >
                    Details <AiOutlineArrowUp />
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>
                        <h3>{job.title.slice(0, CharLimitTitleModal) +
                            (job.title.length > CharLimitTitleModal ? "..." : "")}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>< AiOutlineFileText />  <strong>Job description:</strong>  {job.description.slice(0, CharLimitDescriptionModal) +
                        (job.description.length > CharLimitDescriptionModal ? "..." : "")}
                    </p>
                    <p>
                        <HiOutlineLocationMarker />  <strong>Location:</strong> {job.location.display_name}
                    </p>
                    <p>
                        <MdOutlineToday />  <strong>Posted:</strong> {moment(job.created).fromNow()}
                    </p>
                    <p>
                        <HiOutlineOfficeBuilding />  <strong>Company:</strong> {job.company.display_name.slice(0, CharLimitCompanyModal) +
                            (job.company.display_name.length > CharLimitCompanyModal ? "..." : "")}
                    </p>
                    {showUrl &&
                        <>
                            <p>
                                <strong>Contact:</strong>  <a href={job.redirect_url} target="_blank" rel="noreferrer" > External Website </a>
                            </p>
                        </>
                    }

                    <div className="text-center m-2">

                        {isFreelancerLogin ? (
                            <Button onClick={toggleShowUrl} variant="secondary  col-6"  >
                                {showUrl ? "Hide Contact" : "Show Contact"}
                            </Button>
                        ) :

                            <Button onClick={redirectToLogin} variant="secondary  col-6"
                            >You should be logged to contact this company.
                            </Button>


                        }

                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}

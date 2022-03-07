//Native imports
import { useState } from "react";

//External imports
import Button from "react-bootstrap/Button";
import moment from "moment";
import Modal from "react-bootstrap/Modal";

//Internal imports
import "../../styles/carousel.scss";

export default function ExtApiModalCard({ job }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let CharLimitCompanyCarousel = 20;
    let CharLimitTitleCarousel = 20;
    let CharLimitCompanyModal = 50
    let CharLimitTitleModal = 25;
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
                    Details
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
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>{job.title.slice(0, CharLimitTitleModal) +
                            (job.title.length > CharLimitTitleModal ? "..." : "")}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> <strong>Job description:</strong>  {job.description.slice(0, CharLimitDescriptionModal) +
                        (job.description.length > CharLimitDescriptionModal ? "..." : "")}
                    </p>
                    <p>
                        <strong>Location:</strong> {job.location.display_name}
                    </p>
                    <p>
                        <strong>Posted:</strong> {moment(job.created).fromNow()}
                    </p>
                    <p>
                        <strong>Company:</strong> {job.company.display_name.slice(0, CharLimitCompanyModal) +
                            (job.company.display_name.length > CharLimitCompanyModal ? "..." : "")}
                    </p>
                    <p>
                        <strong>Contact:</strong>  <a href={job.redirect_url} target="_blank" rel="noreferrer" > External Website </a>
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant='secondary' >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

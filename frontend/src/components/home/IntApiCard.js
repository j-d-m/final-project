//Native imports
import { useState } from "react";

//External imports
import Button from "react-bootstrap/Button";
import moment from "moment";
import Modal from "react-bootstrap/Modal";



//Internal imports
import "../../styles/carousel.scss";


let CharLimitCompanyCarousel = 30;
let CharLimitTitleCarousel = 20;

let CharLimitCompanyModal = 50
let CharLimitTitleModal = 100;
let CharLimitDescriptionModal = 500;


export default function IntApiModalCard({ job }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="carousel-card">
            <h5>
                {" "}
                {job.job_Title.slice(0, CharLimitTitleCarousel) +
                    (job.job_Title.length > CharLimitTitleCarousel ? "..." : "")}
            </h5>
            <p> {job.num_of_people_needed} open position(s)</p>
            <p>
                posted{" "}
                {moment(
                    new Date(job.issued_At.slice(0, 10) * 1000).toGMTString()
                ).fromNow()}
            </p>

            <p>
                by{" "}
                <strong>
                    {" "}
                    {job.created_by.company_Name.slice(0, CharLimitCompanyCarousel) +
                        (job.created_by.company_Name.length > CharLimitCompanyCarousel
                            ? "..."
                            : "")}{" "}
                </strong>
            </p>

            <div className="text-center">
                <Button
                    variant="secondary"
                    size="md"
                    onClick={handleShow}
                >
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
                        <h3> {job.job_Title.slice(0, CharLimitTitleModal) +
                            (job.job_Title.length > CharLimitTitleModal ? "..." : "")}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> <strong>Job description:</strong>  {job.job_description.slice(0, CharLimitDescriptionModal) +
                        (job.job_description.length > CharLimitDescriptionModal ? "..." : "")}
                    </p>
                    <p>
                        <strong>Open positions:</strong> {job.num_of_people_needed}
                    </p>
                    <p>
                        <strong>Posted:</strong> {moment(
                            new Date(job.issued_At.slice(0, 10) * 1000).toGMTString()
                        ).fromNow()}
                    </p>
                    <p>
                        <strong>Company:</strong> {job.created_by.company_Name.slice(0, CharLimitCompanyModal) +
                            (job.created_by.company_Name.length > CharLimitCompanyModal ? "..." : "")}
                    </p>
                    <p>
                        <strong>Email:</strong>  <a href={`mailto:${job.created_by.email}`}>{job.created_by.email}</a>
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

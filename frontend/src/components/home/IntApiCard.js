//Native imports
import React, { useState } from "react";

//External imports
import Button from "react-bootstrap/Button";
import moment from "moment";
import Modal from "react-bootstrap/Modal";



//Internal imports
import "../../styles/carousel.scss";


let charLimitCompany = 20;
let charLimitTitle = 30;

let ModalcharLimitCompany = 50;
let ModalcharLimitTitle = 60;
let ModalcharLimitDescription = 10000000;


export default function IntApiCard({ job }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="carousel-card">
            <h5>
                {" "}
                {job.job_Title.slice(0, charLimitTitle) +
                    (job.job_Title.length > charLimitTitle ? "..." : "")}
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
                    {job.created_by.company_Name.slice(0, charLimitCompany) +
                        (job.created_by.company_Name.length > charLimitCompany
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
                    Accept Job
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
                        <h3>{job.job_Title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> <strong>Job description:</strong>  {job.job_description.slice(0, ModalcharLimitDescription) +
                        (job.job_description.length > ModalcharLimitDescription ? "..." : "")}
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
                        <strong>Company:</strong> {job.created_by.company_Name.slice(0, ModalcharLimitCompany) +
                            (job.created_by.company_Name.length > ModalcharLimitCompany ? "..." : "")}
                    </p>
                    <p>
                        <strong>Email:</strong> {job.created_by.email}
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

//Native imports
import React, { } from 'react'

//External imports
import { useQuery } from "@apollo/client";
import Button from 'react-bootstrap/Button'
import Carousel from 'react-elastic-carousel';
import moment from "moment";



//Internal imports
import { GET_JOBS } from "../../graphQL/Queries";
import '../../styles/carousel.scss';

// breakpoints for elastic carousel
const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 1 },
];


export default function IntApiCarousel() {
    const { data, error } = useQuery(GET_JOBS);


    console.log('===========INT API CAROUSEL=========================');
    console.log(data.getJobs);
    console.log('====================================');

    if (error) {
        return (
            <div>
                <p>Currently there are no Job Available</p>
            </div>
        );
    }

    let charLimitCompany = 30;
    let charLimitTitle = 30;
    return (
        <div className="jobs-carousel">
            <hr className="separator" />
            <div className="carousel-wrapper">
                <Carousel breakPoints={breakPoints}>
                    {data.getJobs.map((job) => (
                        <div className="carousel-card" key={job.id}>
                            <h5>
                                {" "}
                                {job.job_Title.slice(0, charLimitTitle) +
                                    (job.job_Title.length > charLimitTitle ? "..." : "")}
                            </h5>
                            <p p> {job.num_of_people_needed} open position(s)</p>
                            <p>posted {moment(new Date((job.issued_At.slice(0, 10)) * 1000).toGMTString()).fromNow()}</p>
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
                                    href={job.redirect_url}
                                    target="_blank"
                                >
                                    Accept Job
                                </Button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

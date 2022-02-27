//Native imports
import React, { useEffect, useState } from 'react'

//External imports
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

//Internal imports
// import Adzuna from "../../services/external-api/Adzuna";
import extApiBg from "../../assets/img/ext-api-bg.png" //https://bggenerator.com/poly_background.php
import API_URL from "../../services/external-api/Adzuna";


function JobsFromExternalApi() {


    const [apiJobs, setApiJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const data = await response.json();

            // console.log('=============JOBS ARRAY=======================');
            // console.log(data);
            // console.log('====================================');

            setApiJobs(data.results);
        };
        fetchData();
    }, []);



    return (
        <div className="ext-api-bg">
            <Carousel fade>
                {apiJobs.map((job) => {
                    let charLimitCompany = 35
                    let charLimitTitle = 50
                    return (
                        <Carousel.Item interval={3000} key={job.id}>
                            <div className="card-body">
                                <img
                                    className="d-block w-100 "
                                    src={extApiBg}
                                    alt="img"
                                />

                                <Carousel.Caption>
                                    <h6> {(job.title).slice(0, charLimitTitle) + ((job.title).length > charLimitTitle ? "..." : "")}</h6>
                                    <h4>{(job.company.display_name).slice(0, charLimitCompany) + ((job.company.display_name).length > charLimitCompany ? "..." : "")}</h4>
                                    <p>Location: {job.location.display_name}</p>
                                    <p>Job Post: {(new Date(job.created)).toLocaleDateString('de-DE')}</p>
                                    <div className="text-center">
                                        <Button variant="secondary" size="lg"
                                            href={job.redirect_url}
                                            target="_blank"
                                        >
                                            More details
                                        </Button>
                                    </div>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>

    )
}


export default JobsFromExternalApi

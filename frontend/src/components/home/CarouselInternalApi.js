//Native imports
import React, { useEffect, useState, Component } from 'react'

//External imports
import Button from 'react-bootstrap/Button'
import Carousel from 'react-elastic-carousel';

//Internal imports
import '../../styles/carousel.scss';


const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1200, itemsToShow: 4, itemsToScroll: 1 },
];

function CarouselInternalApi() {

    const [apiJobs, setApiJobs] = useState([]);

    return (

        <div className="jobs-carousel">
            <hr className="separator" />
            <div className="carousel-wrapper">
                <Carousel breakPoints={breakPoints}>

                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>

                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>

                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>

                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                    < div className='carousel-card' >
                        <h6> Placeholder</h6>
                        <h4>Placeholder</h4>
                        <p>Location: </p>
                        <p>Job Post:</p>
                        <div className="text-center">
                            <Button variant="secondary" size="md"
                                href="#"
                                target="_blank"
                            >
                                Accept Job
                            </Button>
                        </div>

                    </div>
                </Carousel>
            </div>


        </div >
    )
}


export default CarouselInternalApi


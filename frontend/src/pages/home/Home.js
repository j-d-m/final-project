import React, { useEffect } from 'react'
import Navbar from '../../components/navbar'
// import Adzuna from '../../services/external-api/Adzuna'



export default function Home() {

    const API_URL = 'https://api.adzuna.com/v1/api/jobs/de/search/1?app_id=d2c33ab1&app_key=29a3798b05f90a06de46cbde16715be2&results_per_page=10&what_and=freiberuf&what_or=freelance%20freiberuf&where=deutschland&category=hospitality-catering-jobs'

    const [jobs, setJobs] = React.useState([])



    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()
            console.log(data)
            setJobs(data.results)
        }
        fetchData()
    }, [])



    // console.log(API_URL)

    return (

        <div>
            <Navbar />

            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <em> <p>{job.location.display_name}</p> </em>
                        <a href={job.redirect_url}>check it out</a>
                        <br />
                        <br />
                        <hr />
                    </li>
                ))}


            </ul>


        </div>


    )
}

import React from 'react';
import '../../styles/threeSteps.scss';
import register from'../../assets/img/register.svg';
import searchJobs from '../../assets/img/searchJobs.svg';
import  getHired from '../../assets/img/getHired.svg';


const ThreeSteps = () => {
  return (
    <section className="main">
    <div className="center-text">
      <h2>Find and apply for restaurant & hospitality Jobs</h2>
    </div>

    <div className="allExp">
      <div className="exps">
        <div className="circleImage">
          <img src={register} alt="" />
        </div>
        <h4>Create your profile</h4>
        <p>Add photos, your skills and interests so you can apply to jobs fast and show employers who you are and what you bring to the table.</p>
      </div>
      <div className="exps">
        <div className="circleImage">
          <img src={searchJobs} alt="" />
        </div>
        <h4>Search Jobs</h4>
        <p>Find jobs without wasting time. Search once and see all jobs that match, filter results based on your needs, sort by what is most important to you.</p>
      </div>
      <div className="exps">
        <div className="circleImage">
          <img src={getHired} alt="" />
        </div>
        <h4>Get Hired</h4>
        <p>With an ever-growing number of jobs in top restaurants,bars, hotels, nightlife and more, It's never been easier to advance your career.</p>
      </div>
     
    </div>
  </section>
  )
}

export default ThreeSteps
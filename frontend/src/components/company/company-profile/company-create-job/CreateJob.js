import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_JOB } from '../../../../graphQL/Mutations';



function CreateJob() {
    const [textInput, setTextInput] = useState("");


    let jobTitle,
        date,
        numOfPeopleNeeded,
        jobDescription,
        companyName,
        createdBy;

        const [ addJob, {data, loading, error}] = useMutation(CREATE_JOB)
        
        const message = (e) => {
            e.preventDefault()
            setTextInput( e.target.value)
        }


        const addJobProfile = (e)=> {
        e.preventDefault()
        console.log(e.target);
        addJob({
            variables: {
                jobTitle: jobTitle.value,
                date: date.value,
                numOfPeopleNeeded:numOfPeopleNeeded.value,
                jobDescription:textInput,
                // companyName: companyName.value,
                // createdBy:createdBy.value,

            }
        })
    }
    
    console.log(textInput);

        if(loading) return <p> Loading...</p>
        if(error) return <p> there is error</p>
        console.log(data, error);

  return (
    <div>
        <form onSubmit={addJobProfile} className='w-75 m-auto' >
        <div className="mb-3">
          <label htmlFor="exampleInputTex1" className="form-label">
            Job Title
          </label>
          <input 
          ref={(value)=> (jobTitle = value)}
            name="jobTitle"
            type="text"
            className="form-control"
            id="exampleInputTex1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Date
          </label>
          <input
          ref={(value)=> (date = value)}
            name="date"
            type="date"
            className="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            number of people
          </label>
          <input
          ref={(value)=> (numOfPeopleNeeded = value)}
            name="numOfPeopleNeeded"
            type="number"
            className="form-control"
            id="exampleInputPassword2"
          />
        </div>
         <div class="form-outline">
        <textarea onChange={message}  className="form-control" id="textAreaExample2" rows="8"></textarea>
             <label className="form-label" htmlFor="textAreaExample2">Message</label>
            </div> 
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

    </div>
  )
}

export default CreateJob
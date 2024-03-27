import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../Components/PageHeader/PageHeader.jsx'

function JobDetails() {
  const { id } = useParams()
  console.log(id)
  const [job, setJob] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/all-jobs/${id}`).then(res => res.json()).then(data => {
      setJob(data)
    })
  }, [])

  const handleApply = async () => {

    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  }


  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <PageHeader title={'Job Details'} path={'Job Details'} />
      <h1>{job.jobTitle}</h1>

      <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
    </div>
  )
}

export default JobDetails
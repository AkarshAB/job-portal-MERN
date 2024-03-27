import React from 'react'
import Locations from './Locations.jsx'
import Salary from './Salary.jsx'
import JobPostingData from './JobPostingData.jsx'
import WorkExperience from './WorkExperience.jsx'
import EmploymentType from './EmploymentType.jsx'

function Sidebar({ handleChange, handleClick }) {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Filters</h3>
      <Locations handleChange={handleChange} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </div>
  )
}

export default Sidebar
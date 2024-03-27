import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner/Banner.jsx'
import Card from '../Components/Card/Card.jsx'
import Jobs from './Jobs.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Newsletter from '../Components/Newsletter/Newsletter.jsx'


const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:8000/all-jobs').then(res => res.json()).then(data => {
      console.log(data)
      setJobs(data)
      setIsLoading(false);
    })
  }, [])

  const [query, setQuery] = useState('')
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }
  console.log(query)

  //filter jobs by titles
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  )
  console.log(filteredItems)


  // radio based filter
  const handleChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  // button based filtering
  const handleClick = (e) => {
    setSelectedCategory(e.target.value)
  }

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = (startIndex + itemsPerPage)
    return { startIndex, endIndex }
  }

  //function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  //function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // main functions
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems
    }

    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => (
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        postingDate >= selected ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      ))
      console.log(filteredJobs)
    }

    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange()
    filteredJobs = filteredJobs.slice(startIndex, endIndex)
    return filteredJobs.map((data, i) =>
      <Card key={i} data={data} />)


    return filteredJobs.map((data, i) =>
      <Card key={i} data={data} />
    )

  }

  const results = filteredData(jobs, selectedCategory, query)

  return (
    <>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* main content */}

      {/* main content */}
      <div className='bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-4 py-12'>

        {/* left side */}
        <div className='bg-white p-3 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className='col-span-2 bg-white p-4 rounded'>

          {
            isLoading ?
              <p className='font-bold'>Loading...</p>
              :
              results.length > 0 ?
                <Jobs results={results} />
                :
                <>
                  <h3 className='font-bold text-lg mb-2'>{results.length} Jobs</h3>
                  <p>No data found</p>
                </>
          }

          {/* pagination here */}
          {
            results.length > 0 ?
              (
                <div className='flex justify-center mt-4 space-x-8'>
                  <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline'>Previous</button>
                  <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                  <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
                </div>
              )
              :
              ''
          }

        </div>

        {/* right side */}
        <div className='bg-white p-4 rounded'>
          <Newsletter />
        </div>
      </div>
    </>
  )
}

export default Home
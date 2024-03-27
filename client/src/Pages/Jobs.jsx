import React from 'react'

function Jobs({ results }) {
  return (
    <>
      <div>
        <h3 className='font-bold text-lg mb-2'>{results.length} Jobs</h3>
      </div>

      <section>
        {results}
      </section>
    </>
  )
}

export default Jobs
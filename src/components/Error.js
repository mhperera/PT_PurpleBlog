import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <main className='Missing'>
      <h2>404 Error - Page Not Found</h2>
      <p>
        <Link to='/'>Visit our Home Page</Link>
      </p>
    </main>
  )
}

export default Error
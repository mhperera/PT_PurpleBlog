import React from 'react'
import { Link } from 'react-router-dom'

const NavComponent = ( {search, setSearch} ) => {
  return (
    <nav className="Nav">
      <form action="" className="searchForm" onSubmit={(e)=>{e.preventDefault();}}>
        <label htmlFor="search">Search Post</label>
        <input
          type="text"
          id="search"
          placeholder='Search Posts'
          value={search}
          onChange={(e)=>{setSearch(e.target.value);}}
        />
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/post'>New Post</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </form>
    </nav>
  )
}

export default NavComponent
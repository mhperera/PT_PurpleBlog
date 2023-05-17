import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NavComponent = () => {

  const posts = useStoreState((state)=>state.posts);
  const search = useStoreState((state)=>state.search);
  const setSearch = useStoreActions((action)=>action.setSearch);
  const setSearchResult = useStoreActions((action)=>action.setSearchResult);

  useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);
    console.log("HIT...",filteredResults);
		setSearchResult(filteredResults.reverse());
	}, [posts, search, setSearchResult]);

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
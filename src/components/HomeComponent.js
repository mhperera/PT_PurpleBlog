import React from 'react'
import FeedComponent from './FeedComponent.js'
import { useContext } from 'react';
import DataContext from '../context/DataContext.js';

const HomeComponent = () => {

  const {searchResult:posts, fetchError, isLoading} = useContext(DataContext);

  return (
    <main className='Home'>

      { isLoading && <p className='statusMsg'>Loading posts...</p> }
      { !isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }} >{ fetchError }</p> }


      { !isLoading && !fetchError &&

        <>
            { posts.length ?
                <FeedComponent
                  posts={posts}
                />
              :
                <p style={{ color:'red', margin:'25px' }}>There are no Posts</p>
            }
        </>

      }

    </main>
  )
}

export default HomeComponent
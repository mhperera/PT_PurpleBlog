import React from 'react'
import FeedComponent from './FeedComponent.js'

const HomeComponent = ({posts, fetchError, isLoading}) => {
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
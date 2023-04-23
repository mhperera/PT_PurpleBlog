import React from 'react'
import FeedComponent from './FeedComponent.js'

const HomeComponent = ({posts}) => {
  return (
    <main className='Home'>
      { posts.length ?
        <FeedComponent
          posts={posts}
        />
      :
        <p style={{ color:'red', margin:'25px' }}>There are no Posts</p>
      }
    </main>
  )
}

export default HomeComponent
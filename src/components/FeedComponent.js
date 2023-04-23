import React from 'react'
import Post from './Post'

const FeedComponent = ({ posts }) => {
  return (
    <>
        {
            posts.map((post)=>(
                <Post
                    key={post.id}
                    post={post}
                />
            ))
        }
    </>
  )
}

export default FeedComponent
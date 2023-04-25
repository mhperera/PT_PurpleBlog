import React from 'react'

const NewPostComponent = ({ handleSubmit, postTitle, postBody, setPostTitle, setPostBody }) => {
  return (
    <main className='NewPost'>

      <h2>New Post</h2>

      <form className="newPostForm" onSubmit={(e)=>{ handleSubmit(e); }}>

        <label htmlFor="postTitle">Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={postTitle}
          onChange={(e)=>{setPostTitle(e.target.value)}}
        />

        <label htmlFor="postBody">Title</label>
        <textarea
          required
          id="postBody"
          name="postBody"
          value={postBody}
          onChange={(e)=>{setPostBody(e.target.value)}}
        />

        <button type='Sumit'>
          Save Post
        </button>

      </form>
    </main>
  )
}

export default NewPostComponent
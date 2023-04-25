import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPostComponent = ({posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) => {

    const {id} = useParams();
    const post = posts.find((post)=>((post.id).toString()===id));

    useEffect(()=>{

        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }else{
            console.log('hittttt');
        }

    },[post, setEditTitle, setEditBody]);

    return (
    <main className='EditPost'>

        { editTitle &&

            <>

                <h2>Edit Post</h2>

                <form className="newPostForm" onSubmit={(e)=>{ e.preventDefault(); }}>

                    <label htmlFor="editTitle">Title</label>
                    <input
                        type="text"
                        id="editTitle"
                        name="editTitle"
                        value={editTitle}
                        onChange={(e)=>{setEditTitle(e.target.value)}}
                    />

                    <label htmlFor="editBody">Title</label>
                    <textarea
                        required
                        id="editBody"
                        name="editBody"
                        value={editBody}
                        onChange={(e)=>{setEditBody(e.target.value)}}
                    />

                    <button type='Sumit' onClick={()=>{handleEdit(post.id)}}>
                        Edit Post
                    </button>

                </form>

            </>

        }

        { !editTitle &&

            <>
                <h2>Post not found</h2>
                <p>Well its dissapointing</p>
                <p>
                    <Link to='/' >Visit our Home Page</Link>
                </p>
            </>

        }

    </main>
  )
}

export default EditPostComponent
import React from 'react'
import { useParams, Link} from 'react-router-dom';

const PostPageComponent = ({ posts, handleDelete }) => {

  const { id } = useParams();
  const post = posts.find((post)=>( (post.id).toString() === id) );

  return (
    <main className='PostPage'>

      <article class="post">
        { post &&

            <>
              <h2>{ post.title }</h2>
              <p className="postDate">{ post.datetime }</p>
              <p className="postDate">{ post.body }</p>
              <button onClick={()=>{handleDelete(post.id);}}>
                Delete Post
              </button>
            </>

        }

        { !post &&

          <>

            <h2>Post not found</h2>
            <p>Well its dissapointing</p>
            <p>
              <Link to='/' >Visit our Home Page</Link>
            </p>
          </>

        }
      </article>

    </main>
  )
}

export default PostPageComponent
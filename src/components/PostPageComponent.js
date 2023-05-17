import React from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';


const PostPageComponent = () => {

	const deletePost = useStoreActions((action)=> action.deletePost);
	const getPostById = useStoreState((state)=>state.getPostById);
	const { id } = useParams();
	const post = getPostById(id);
	const navigate = useNavigate();

	const handleDelete = async (id) => {
		deletePost(id);
		navigate('/');
	};

	return (
		<main className="PostPage">
			<article className="post">
				{post && (
					<>
						<h2>{post.title}</h2>
						<p className="postDate">{post.datetime}</p>
						<p className="postDate">{post.body}</p>
						<Link to={`/edit/${post.id}`}>
							<button className="editButton btn">Edit Post</button>
						</Link>
						<button
							className="deleteButton btn"
							onClick={() => {
								handleDelete(post.id);
							}}
						>
							Delete Post
						</button>
					</>
				)}

				{!post && (
					<>
						<h2>Post not found</h2>
						<p>Well its dissapointing</p>
						<p>
							<Link to="/">Visit our Home Page</Link>
						</p>
					</>
				)}
			</article>
		</main>
	);
};

export default PostPageComponent;

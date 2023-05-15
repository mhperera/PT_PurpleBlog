import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from '../context/DataContext';

const PostPageComponent = () => {
	const { posts, api, navigate, setPosts } = useContext(DataContext);
	const { id } = useParams();
	const post = posts.find((post) => post.id.toString() === id);

	const handleDelete = async (id) => {
		try {
			await api.delete(`/posts/${id}`);
			const newPosts = posts.filter((item) => item.id !== id);
			setPosts(newPosts);
			navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
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

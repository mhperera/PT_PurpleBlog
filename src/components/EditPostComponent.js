import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from '../context/DataContext';

const EditPostComponent = () => {
	const { posts, format, api, navigate, setPosts } = useContext(DataContext);

	const [editTitle, setEditTitle] = useState('');
	const [editBody, setEditBody] = useState('');

	const { id } = useParams();
	const post = posts.find((post) => post.id.toString() === id);

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		} else {
			console.log('hittttt');
		}
	}, [post, setEditTitle, setEditBody]);

	const handleEdit = async (id) => {
		try {
			const datetime = format(new Date(), 'MMMM dd, yyyy pp');
			const editedPost = {
				id,
				title: editTitle,
				body: editBody,
				datetime,
			};
			const response = await api.patch(`/posts/${id}`, editedPost);
			setPosts(
				posts.map((post) => (post.id === id ? response.data : post))
			);
			setEditBody('');
			setEditTitle('');
			navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
	};

	return (
		<main className="EditPost">
			{editTitle && (
				<>
					<h2>Edit Post</h2>

					<form
						className="newPostForm"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<label htmlFor="editTitle">Title</label>
						<input
							type="text"
							id="editTitle"
							name="editTitle"
							value={editTitle}
							onChange={(e) => {
								setEditTitle(e.target.value);
							}}
						/>

						<label htmlFor="editBody">Title</label>
						<textarea
							required
							id="editBody"
							name="editBody"
							value={editBody}
							onChange={(e) => {
								setEditBody(e.target.value);
							}}
						/>

						<button
							className='btn'
							type="Sumit"
							onClick={() => {
								handleEdit(post.id);
							}}
						>
							Edit Post
						</button>
					</form>
				</>
			)}

			{!editTitle && (
				<>
					<h2>Post not found</h2>
					<p>Well its dissapointing</p>
					<p>
						<Link to="/">Visit our Home Page</Link>
					</p>
				</>
			)}
		</main>
	);
};

export default EditPostComponent;

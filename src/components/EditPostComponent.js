import React from 'react';
import {  useEffect } from 'react';
import { format } from 'date-fns';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPostComponent = () => {
	// const { posts, format, api, navigate, setPosts } = useContext(DataContext);
	const editTitle = useStoreState((state)=>state.editTitle);
	const editBody = useStoreState((state)=>state.editBody);
	const setEditTitle = useStoreActions((action)=>action.setEditTitle);
	const setEditBody = useStoreActions((action)=>action.setEditBody);
	const getPostById = useStoreState((state)=>state.getPostById);
	const editPost = useStoreActions((action)=>action.editPost);

	const navigate = useNavigate();

	const { id } = useParams();
	const post = getPostById(id);

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		} else {
			console.log('hittttt');
		}
	}, [post, setEditTitle, setEditBody]);

	const handleEdit = (id) => {

			const datetime = format(new Date(), 'MMMM dd, yyyy pp');
			const editedPost = {
				id,
				title: editTitle,
				body: editBody,
				datetime,
			};
			editPost(editedPost);
			navigate('/');
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
							type="button"
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

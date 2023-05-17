import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns';

const NewPostComponent = () => {

	const posts = useStoreState((state)=>state.posts);
	const postTitle = useStoreState((state)=>state.postTitle);
	const postBody = useStoreState((state)=>state.postBody);

	const savePost = useStoreActions((action)=>action.savePost);
	const setPostTitle = useStoreActions((action)=>action.setPostTitle);
	const setPostBody = useStoreActions((action)=>action.setPostBody);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const newPost = {
			id,
			title: postTitle,
			body: postBody,
			datetime,
		};
		savePost(newPost);
		navigate('/');
	};

	return (
		<main className="NewPost">
			<h2>New Post</h2>

			<form
				className="newPostForm"
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<label htmlFor="postTitle">Title</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={postTitle}
					onChange={(e) => {
						setPostTitle(e.target.value);
					}}
				/>

				<label htmlFor="postBody">Title</label>
				<textarea
					required
					id="postBody"
					name="postBody"
					value={postBody}
					onChange={(e) => {
						setPostBody(e.target.value);
					}}
				/>

				<button className='btn' type="Sumit">Save Post</button>
			</form>
		</main>
	);
};

export default NewPostComponent;

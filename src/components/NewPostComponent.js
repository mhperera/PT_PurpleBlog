import React from 'react';
import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

const NewPostComponent = () => {
	const { posts, format, api, navigate, setPosts } = useContext(DataContext);

	const [postTitle, setPostTitle] = useState('');
	const [postBody, setPostBody] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const newPost = {
			id,
			title: postTitle,
			body: postBody,
			datetime,
		};
		try {
			const response = await api.post('/posts', newPost);
			const allPosts = [...posts, response.data];
			setPosts(allPosts);
			setPostBody('');
			setPostTitle('');
			navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
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

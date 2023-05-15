import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
	return (
		<article className="Post card card-body mb-4 p-4 rounded-2 border border-top border-primary border-1">
			<Link to={`post/${post.id}`}>
				<h3>{post.title}</h3>
				<p className="postDate">{post.datetime}</p>
			</Link>
			<p className="postBody">
				{post.body.length <= 400
					? post.body
					: `${post.body.slice(0, 400)}...`}
			</p>
		</article>
	);
};

export default Post;

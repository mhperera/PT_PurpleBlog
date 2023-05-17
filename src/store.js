import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts';

export default createStore ({

    posts : [],
    setPosts: action((state, payload)=>{
        state.posts = payload;
    }),

    postTitle : '',
    setPostTitle: action((state, payload)=>{
        state.postTitle = payload;
    }),

    postBody : '',
    setPostBody: action((state, payload)=>{
        state.postBody = payload;
    }),

    editTitle : '',
    setEditTitle: action((state, payload)=>{
        state.editTitle = payload;
    }),

    editBody : '',
    setEditBody: action((state, payload)=>{
        state.editBody = payload;
    }),

    search : '',
    setSearch: action((state, payload)=>{
        state.search = payload;
    }),

    searchResult : '',
    setSearchResult: action((state, payload)=>{
        state.searchResult = payload;
    }),

    postCount : computed( (state) => state.posts.length ),
    getPostById : computed( (state) => {
        return (id) => state.posts.find((post) => (post.id).toString() === id);
    }),

    savePost: thunk( async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
			const response = await api.post('/posts', newPost);
			actions.setPosts([...posts, response.data]);
			actions.setPostBody('');
			actions.setPostTitle('');
			// navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
    }),

    deletePost: thunk( async (actions, id, helpers) => {
        const { posts } = helpers.getState();
        try {
			await api.delete(`/posts/${id}`);
			actions.setPosts(posts.filter((item) => item.id !== id));
			// navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
    }),

    editPost: thunk( async (actions, editedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = editedPost;
        try {
			const response = await api.patch(`/posts/${id}`, editedPost);
			actions.setPosts(
				posts.map((post) => (post.id === id ? response.data : post))
			);
			actions.setEditBody('');
			actions.setEditTitle('');
			// navigate('/');
		} catch (error) {
			console.log(`Error : ${error.message}`);
		}
    }),

});
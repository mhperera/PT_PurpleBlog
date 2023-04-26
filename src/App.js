import HeaderComponent from './components/template/HeaderComponent';
import NavComponent from './components/template/NavComponent';
import FooterComponent from './components/template/FooterComponent';

import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import NewPostComponent from './components/NewPostComponent';
import PostPageComponent from './components/PostPageComponent';
import EditPostComponent from './components/EditPostComponent';
import Error from './components/Error.js';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts'

import useWindowSize from './hooks/useWindowSize'


function App() {

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id +1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id,
      title : postTitle,
      body : postBody,
      datetime
    }
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [ ...posts, response.data];
      setPosts(allPosts);
      setPostBody('');
      setPostTitle('');
      navigate('/');
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }

  }

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');
      const editedPost = {id, title: editTitle, body: editBody, datetime};
      const response = await api.patch(`/posts/${id}`, editedPost);
      setPosts( posts.map((post)=>(post.id===id? response.data : post)) );
      setEditBody('');
      setEditTitle('');
      navigate('/');
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  }

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const newPosts = posts.filter( (item)=>(item.id!==id));
      setPosts(newPosts);
      navigate('/');
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }

  }

  useEffect(()=>{

    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        if(response && response.data) {
          setPosts(response.data);
        }
      } catch (error) {
        // THIS IS NOT IN THE 200 ERROR CODE RANGE
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }else{
          console.log(`Error : ${error.message}`);
        }

      } finally {

      }
    }

    fetchPosts();

  },[]);

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>(
      (( post.body).toLowerCase() ).includes( search.toLowerCase() )
      ||
      (( post.title).toLowerCase() ).includes( search.toLowerCase() )
    ));
    setSearchResult(filteredResults.reverse());
  },[posts, search]);

  const {width} = useWindowSize();

  return (
    <div className="App">

      <HeaderComponent
        title= 'React JS Blog'
        width={width}
      />

      <NavComponent
        search = {search}
        setSearch={setSearch}
      />

      <Routes>

        <Route
          exact path='/'
          element={<HomeComponent
                      posts={searchResult}
                    />}
        />

        <Route
          exact path='/post'
          element={<NewPostComponent
                      handleSubmit={handleSubmit}
                      postTitle={postTitle}
                      setPostTitle={setPostTitle}
                      postBody={postBody}
                      setPostBody={setPostBody}
                  />}
        />

        <Route
          path='/edit/:id'
          element={<EditPostComponent
                      posts={posts}
                      handleEdit={handleEdit}
                      editBody={editBody}
                      setEditBody={setEditBody}
                      editTitle={editTitle}
                      setEditTitle={setEditTitle}
                  />}
        />

        <Route
          exact path='/post/:id'
          element={<PostPageComponent
                      posts={posts}
                      handleDelete={handleDelete}
                  />}
        />

        <Route
          exact path='/about'
          element={<AboutComponent/>}
        />

        <Route
          path='*'
          element={<Error/>}
        />

      </Routes>

      <FooterComponent />

    </div>
  );
}

export default App;

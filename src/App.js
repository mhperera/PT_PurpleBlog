import HeaderComponent from './components/template/HeaderComponent';
import NavComponent from './components/template/NavComponent';
import FooterComponent from './components/template/FooterComponent';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import NewPostComponent from './components/NewPostComponent';
import PostPageComponent from './components/PostPageComponent';
import EditPostComponent from './components/EditPostComponent';
import Error from './components/Error.js';
import { DataProvider } from './context/DataContext';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  // const {width} = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(()=>{
    setPosts(data);
  },[data]);

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>(
      (( post.body).toLowerCase() ).includes( search.toLowerCase() )
      ||
      (( post.title).toLowerCase() ).includes( search.toLowerCase() )
    ));
    setSearchResult(filteredResults.reverse());
  },[posts, search]);

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

  return (
    <div className="App">

      <DataProvider>

        <HeaderComponent
          title= 'React JS Blog'
        />

        <NavComponent/>

        <Routes>

          <Route
            exact path='/'
            element={<HomeComponent/>}
          />

          <Route
            exact path='/post'
            element={<NewPostComponent />}
          />

          <Route
            path='/edit/:id'
            element={<EditPostComponent />}
          />

          <Route
            exact path='/post/:id'
            element={<PostPageComponent />}
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

      </DataProvider>

    </div>
  );
}

export default App;

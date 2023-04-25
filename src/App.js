import HeaderComponent from './components/template/HeaderComponent';
import NavComponent from './components/template/NavComponent';
import FooterComponent from './components/template/FooterComponent';

import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import NewPostComponent from './components/NewPostComponent';
import PostPageComponent from './components/PostPageComponent';
import Error from './components/Error.js';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id +1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id,
      title : postTitle,
      body : postBody,
      datetime
    }
    const allPosts = [ ...posts, newPost];
    setPosts(allPosts);
    setPostBody('');
    setPostTitle('');
    navigate('/');
  }

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([
    {
      id : 1,
      title : '1st Post on facebook 5',
      datetime : '2023 04 20 01:01:00',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?'
    },
    {
      id : 2,
      title : '2nd Post on facebook 55',
      datetime : '2023 04 20 01:01:00',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?'
    },
    {
      id : 3,
      title : '3rd Post on facebook',
      datetime : '2023 04 20 01:01:00',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?'
    }
  ]);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    const newPosts = posts.filter( (item)=>(item.id!==id));
    setPosts(newPosts);
    navigate('/');
  }

  useEffect(()=>{
    const filteredResults = posts.filter((post)=>(
      (( post.body).toLowerCase() ).includes( search.toLowerCase() )
      ||
      (( post.title).toLowerCase() ).includes( search.toLowerCase() )
    ));
    setSearchResult(filteredResults.reverse());
  },[posts, search]);

  return (
    <div className="App">

      <HeaderComponent
        title= 'React JS Blog'
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

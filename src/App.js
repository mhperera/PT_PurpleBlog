import HeaderComponent from './components/template/HeaderComponent';
import NavComponent from './components/template/NavComponent';
import FooterComponent from './components/template/FooterComponent';

import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import NewPostComponent from './components/NewPostComponent';
import PostPageComponent from './components/PostPageComponent';
import Error from './components/Error.js';

import { BrowserRouter as Router , Routes, Route, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([
    {
      id : 1,
      title : '1st Post on facebook',
      datetime : '2023 04 20 01:01:00',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, dolorem?'
    },
    {
      id : 2,
      title : '2nd Post on facebook',
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

  const handleDelete = () => {

  }

  return (
    <div className="App">

        <Router>

          <HeaderComponent
            title= 'React JS Blog'
          />

          <NavComponent
            search = {search}
            setSearch={setSearch}
          />

          <Routes>

            <Route exact path='/'  element={<HomeComponent posts={posts} />}/>

            <Route exact path='/post'  element={<NewPostComponent/>}/>

            <Route exact path='/post/:id'  element={<PostPageComponent posts={posts} handleDelete={handleDelete} />}/>

            <Route exact path='/about'  element={<AboutComponent/>}/>

            <Route path='*'  element={<Error/>}/>

          </Routes>

          <FooterComponent />

        </Router>

    </div>
  );
}

export default App;

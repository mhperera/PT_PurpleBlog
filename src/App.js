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
  return (
    <div className="App">

        <HeaderComponent />
        <NavComponent />

        <Router>

          <Routes>

            <Route exact path='/'  element={<HomeComponent/>}/>
            <Route exact path='/post'  element={<NewPostComponent/>}/>
            <Route exact path='/post/:id'  element={<PostPageComponent/>}/>
            <Route exact path='/about'  element={<AboutComponent/>}/>
            <Route path='*'  element={<Error/>}/>

          </Routes>

        </Router>

        <FooterComponent />

    </div>
  );
}

export default App;

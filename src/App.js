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

import { Routes, Route } from 'react-router-dom';

function App() {

	return (
		<div className="App">
			<DataProvider>
				<HeaderComponent title="React JS Blog" />

				<NavComponent />

				<Routes>
					<Route path="/" element={<HomeComponent />} />
					<Route path="/post" element={<NewPostComponent />} />
					<Route path="/edit/:id" element={<EditPostComponent />} />
					<Route path="/post/:id" element={<PostPageComponent />} />
					<Route path="/about" element={<AboutComponent />} />
					<Route path="*" element={<Error />} />
				</Routes>

				<FooterComponent />
			</DataProvider>
		</div>
	);
}

export default App;

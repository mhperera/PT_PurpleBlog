import HeaderComponent from './components/template/HeaderComponent';
import NavComponent from './components/template/NavComponent';
import FooterComponent from './components/template/FooterComponent';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import NewPostComponent from './components/NewPostComponent';
import PostPageComponent from './components/PostPageComponent';
import EditPostComponent from './components/EditPostComponent';
import Error from './components/Error.js';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
	const setPosts = useStoreActions((action) => action.setPosts);

	const { data, fetchError, isLoading } = useAxiosFetch(
		`${process.env.REACT_APP_API_URL}/posts`
	);

	useEffect(() => {
		setPosts(data);
	}, [data, setPosts]);

	return (
		<div className="App">
			<HeaderComponent title="React JS Blog" />

			<NavComponent />

			<Routes>
				<Route
					path="/"
					element={
						<HomeComponent
							isLoading={isLoading}
							fetchError={fetchError}
						/>
					}
				/>
				<Route path="/post" element={<NewPostComponent />} />
				<Route path="/edit/:id" element={<EditPostComponent />} />
				<Route path="/post/:id" element={<PostPageComponent />} />
				<Route path="/about" element={<AboutComponent />} />
				<Route path="*" element={<Error />} />
			</Routes>

			<FooterComponent />
		</div>
	);
}

export default App;

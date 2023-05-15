import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './../api/posts';
import useAxiosFetch from './../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();
	const { data, fetchError, isLoading } = useAxiosFetch(
		`${process.env.REACT_APP_API_URL}/posts`
	);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	useEffect(() => {
		const filteredResults = posts.filter(
			(post) =>
				post.body.toLowerCase().includes(search.toLowerCase()) ||
				post.title.toLowerCase().includes(search.toLowerCase())
		);
		setSearchResult(filteredResults.reverse());
	}, [posts, search]);

	return (
		<DataContext.Provider
			value={{
				search,
				setSearch,
				searchResult,
				fetchError,
				isLoading,
				posts,
				setPosts,
				format,
				api,
				navigate,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export default DataContext;

// import React, { useState, useContext } from 'react';

// import { UserContext } from '../../Context/UserContext';

// import axios from "axios";

const SearchBar = () => {
	// const { userValue } = useContext(UserContext);

	// const [notes, setNotes] = useState("");
	// const [content, setContent] = useState("");
	// const [loading, setLoading] = useState(false);

	// const url = `http://localhost:3001/api`

	// function handleChange(e) {
	// 	const {name,value} = e.target;

	// 	setContent(prevSearch => {
	// 		return {
	// 			...prevSearch,
	// 			[name]: value
	// 		};
	// 	})
	// }

	// const onSearch = (e) => {
	// 	e.preventDefault();
	// 	console.log('hit')
	// 	const token = userValue[3];
	// 	const userId = userValue[0];

	// 	const headers = {
	// 		"x-access-token": token
	// 	}

	// 	const fetchNotes = async () => {
	// 		setLoading(true);
	// 		const res = await axios.get(`${url}/notes/search?userId=${userId}&content=${content["search"]}`, {headers})
	// 		setNotes(res.data.Note)
	// 		setLoading(false);
	// 	}

	// 	fetchNotes();
	// }

	// return(
	// 	<div>
	// 		<input className="searchbar-input" name="search" onChange={handleChange} placeholder="search..." />
	// 		<button className="note-form-button" onClick={onSearch}>Search</button>
	// 	</div>
	// )
}

export default SearchBar;
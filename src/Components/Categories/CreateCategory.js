import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import axios from 'axios';

const CreateCategory = (props) => {
	const url = process.env.REACT_APP_API_URL

	const { userValue } = useContext(UserContext);

	const [category, setCategory] = useState({
		name: "",
		userId: userValue[0]
	});

	function onHandleChange(e) {
		const {name,value} = e.target;

		setCategory(prevCategory => {
			return {
				...prevCategory,
				[name]: value
			};
		})
	}

	function onHandleSubmit(e) {
		e.preventDefault();
		const token = userValue[3];
		const headers = {
			"x-access-token": token
		}

		axios.post(`${url}/categories`, category , {headers})
			.then((res) => {
				const newCategory = { 
					_id: res.data.category._id, 
					name: res.data.category.name, 
					userId: res.data.category.userId
				}
				setCategory(newCategory);
				props.addCategory(newCategory);
			}, (error) => {
				console.log(error);
			}).then(
				setTimeout(() => {
					setCategory({ 
						name: "",
						userId: ""
					})
					setCategory('');
				},1000)
			)
	}


	return(
		<div>
			<form className="category-input-form">

				<input className="category-input-form" name="name" onChange={onHandleChange} value={category.name} placeholder="Category name" />

				<br></br>
				
				<button className="add-category-button" onClick={onHandleSubmit}>Add</button>

				<div>
				</div>

			</form>			
		</div>

	)
}

export default CreateCategory;
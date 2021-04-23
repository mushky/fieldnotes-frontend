import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import NoteAddIcon from '@material-ui/icons/NoteAdd';


import axios from 'axios';


const CreateCategory = (props) => {
	const url = `http://localhost:3001/api`
	const localUrl = `http://192.168.1.75:3001/api`

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

		axios.post(`${localUrl}/categories`, category , {headers})
			.then((res) => {
				const newCategory = { 
					_id: res.data.category._id, 
					name: res.data.category.name, 
					userId: res.data.category.userId
				}
				setCategory(newCategory);
				props.onAdd(newCategory);
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

				<span>
					<input className="category-input-form" name="name" onChange={onHandleChange} value={category.name} placeholder="Category name" />
					<button className="add-category-button" onClick={onHandleSubmit}>Add</button>
				</span>

				<div className="">
				</div>

			</form>			
		</div>

	)
}

export default CreateCategory;
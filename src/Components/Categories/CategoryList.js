import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Link } from 'react-router-dom';

import axios from 'axios';
import CreateCategory from './CreateCategory';

const CategoryList = (props) => {
	const url = `http://localhost:3001/api`
	const localUrl = `http://192.168.1.75:3001/api`

	const { userValue } = useContext(UserContext);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios.get(`${localUrl}/categories/user/${userValue[0]}`)
			setCategories(res.data.category);
		}

		fetchCategories();
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	function addCategory(newCategory) {
    setCategories(prevCategories => {
      return [newCategory, ...prevCategories];
    })
  }

	return(
		<div className="category-container">
			<Link to="/Notes">
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
					<path 
						fill="#FFFFFF" 
						d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23a1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
				</svg>
				<br></br>
			</Link>

			<h2 className="category-title">Category List</h2>
			
			<CreateCategory onAdd={addCategory}/>

			<div className="category-list">
				{categories.map((category) => {
					return(
						<h3 className="category-item">{category.name}</h3>
					)
				})}
			</div>

		</div>
	)

}

export default CategoryList;
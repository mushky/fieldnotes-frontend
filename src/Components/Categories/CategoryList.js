import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { Link } from 'react-router-dom';

import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

import axios from 'axios';
import CreateCategory from './CreateCategory';

const CategoryList = (props) => {
	const url = `http://localhost:3001/api`

	const { userValue } = useContext(UserContext);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const res = await axios.get(`${url}/categories/user/${userValue[0]}`)
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
			<Link to="/Notes">Back</Link>

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
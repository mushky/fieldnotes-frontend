import React from 'react'
import { Link } from 'react-router-dom'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const SearchBar = (props) => {
  // TODO: Refactor to replace Searchbar in NoteList
  const handleSearchChange = (e) => {

  }

  const toggleEditMode = () => {

  }

  const onSearch = () => {

  }

  return(
    <div>
      <div className="search-fieldwrapper">
        <input className="searchbar-input" 
					name="search" 
					onChange={handleSearchChange} 
					placeholder="Search..." 
        />

        {/* Show on Desktop */}
        <button className="add-button" onClick={toggleEditMode}>+</button>
        {/* Show on Mobile*/}
        <Link to="/AddNote"><button className="add-button-responsive" onClick={toggleEditMode}>+</button></Link>

        <SearchRoundedIcon className="search-button" style={{ fontSize: 40 }} onClick={onSearch}/>

      </div>

      <div className="search-filter-bar">
        <strong>
          <span className="search-filter-bar-text-left">
            Recent
          </span>
        </strong>

        <strong>
          <span className="search-filter-bar-text-right">
            <select className="custom-select">
              <option>Default</option>
              <option>Title</option>
              <option>Category</option>
              <option>Tags</option>
            </select>
            <span className="select-down-chevron">&#9660;</span>

          </span>
        </strong>
      </div>
    </div>
  )
}


export default SearchBar;
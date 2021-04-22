import React from 'react';

const SmallNote = (props) => {

	function handleSelect(e) {
		props.onSelect(props);
	}

	function truncate(str) {
    return str.length > 100 ? str.substring(0, 100) + "..." : str;
	}

	return(
		<div className="note" onClick={handleSelect}>
			<h4>{props.title}</h4>
			<p>{truncate(props.content)}</p>
		</div>
	)
}

export default SmallNote;	
import React from 'react';

const SmallNote = (props) => {

	function handleSelect(e) {
		props.onSelect(props);
	}

	function truncate(str) {
    return str.length > 160 ? str.substring(0, 160) + "..." : str;
	}

	return(
		<div className="note" onClick={handleSelect}>
			<h3>{props.title}</h3>
			<br></br>
			<p>{truncate(props.content)}</p>
		</div>
	)
}

export default SmallNote;	
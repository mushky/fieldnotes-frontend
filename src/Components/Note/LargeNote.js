import React from 'react';

const LargeNote = (props) => {
	return(
		<div>
			<h1>{props.title}</h1> 
			<p>{props.content}</p>
			<br></br>
			<pre>{props.category}</pre>
			<pre>{props.tags}</pre> 
		</div>
	)

}

export default LargeNote;

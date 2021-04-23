import React from 'react';


const LargeNote = (props) => {

	return(
		<div>
			<h2>{props.title}</h2>
			<br></br> 
			<p>{props.content}</p>
			<br></br><br></br>
			<p>{props.link}</p>
			<br></br>
			<pre>{props.category}</pre>
			<pre>{props.tags}</pre> 
		</div>
	)

}

export default LargeNote;

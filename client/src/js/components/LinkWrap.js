import React from 'react'
import {Link} from 'react-router-dom'

// Bootstrap's LinkContainer for react-router v4 not working

const LinkWrap = ({to, children}) => {
	return (
		<Link to={to} style={{ cursor: 'pointer'}}>{children}</Link>
	);
};

export default LinkWrap
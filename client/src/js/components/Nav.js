'use strict';

/**
 * Nav.js
 *
 * This component renders the navigation bar
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
	// Render either the Login and Sign up buttons, or the Home and Logout button
	// based on the current authentication state.
	const navButtons = props.loggedIn ? (
			<nav>
				<Link to="/list" className="btn btn--nav">Home</Link>
				<a href="#" className="btn btn--login btn--nav" onClick={(ev)=>{ev.preventDefault(); props.onLogout()}}>Logout</a>
			</nav>
		) : (
			<nav>
				<Link to="/register" className="btn btn--login btn--nav">Sign up</Link>
				<Link to="/login" className="btn btn--login btn--nav">Login</Link>
			</nav>
		);
	
	return(
		<header className="circle--header">
			<a href="/"><img className="main-logo" src="/images/doctor.svg" alt="logo"/></a>
			{navButtons}
		</header>

	)
}

Nav.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	onLogout: PropTypes.func.isRequired
};

export default Nav;

'use strict';

/**
 * Nav.js
 *
 * This component renders the navigation bar
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
	// Render either the Log In and register buttons, or the logout button
	// based on the current authentication state.
	const navButtons = props.loggedIn ? (
			<nav>
				<Link to="/list" className="btn btn--nav">Home</Link>
				<a href="#" className="btn btn--login btn--nav" onClick={(ev)=>{ev.preventDefault(); props.onLogout()}}>Logout</a>
			</nav>
		) : (
			<nav>
				<Link to="/register" className="btn btn--login btn--nav">Register</Link>
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
	loggedIn: React.PropTypes.bool.isRequired
};

export default Nav;

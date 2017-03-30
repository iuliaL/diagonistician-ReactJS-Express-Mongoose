'use strict';

/**
 * Nav.js
 *
 * This component renders the navigation bar
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
	function logout() {
		props.dispatch(logout());
	}
	
	// Render either the Log In and register buttons, or the logout button
	// based on the current authentication state.
	const navButtons = props.loggedIn ? (
			<nav>
				<Link to="/dashboard" className="btn btn--dash btn--nav">Dashboard</Link>
				<a href="#" className="btn btn--login btn--nav" onClick={logout}>Logout</a>
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

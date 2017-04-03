'use strict';

/**
 * Nav.js
 * This component renders the navigation bar
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
	// Render either the Login and Sign up buttons, or the Home and Logout button
	// based on the current authentication state.
	const navButtons = props.loggedIn ? (
			<ul className="nav nav-pills">
				<li><Link to="/list" className="btn">Home</Link></li>
				<li><a href="#" className="btn" onClick={(ev)=>{ev.preventDefault(); props.onLogout()}}>Logout</a></li>
				<li className="pull-right user-details">
					<a className="username">{props.user.username}</a>
					<a className="points">{props.user.points} points</a>
				</li>
			
			</ul>
		) : (
			<ul  className="nav nav-pills">
				<li><Link to="/register" className="btn">Sign up</Link></li>
				<li><Link to="/login" className="btn">Login</Link></li>
			</ul>
		);
	
	return(
		<div className="circle--header">
			<div className="bounds">
				{navButtons}
			</div>
			<Link to="/list" className="logo-link"><img className="main-logo" src="/images/doctor.svg" alt="logo"/></Link>
		</div>

	)
}

Nav.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	user: PropTypes.object,
	onLogout: PropTypes.func.isRequired
};

export default Nav;

'use strict';

/**
 * Nav.js
 * This component renders the navigation bar
 */

import React from 'react';
import PropTypes from 'prop-types';

import { NavLink, Link } from 'react-router-dom';

function Nav(props) {
	// Render either the Login and Sign up buttons, or the Home and Logout button
	// based on the current authentication state.
	const navButtons = props.loggedIn ? (
		<ul className="nav nav-pills">
			<li><NavLink to="/list" activeClassName='active' className="btn">Home</NavLink></li>
			<li><a href="#" className="btn" onClick={(ev) => { ev.preventDefault(); props.onLogout() }}>Logout</a></li>
			<li className="pull-right user-details">
				<a className="btn username">
					<i className="glyphicon glyphicon-user" style={{ marginRight: 10 }}> </i>
					{props.user.username}</a>
				<a className="btn points">
					<i className="glyphicon glyphicon-plus" style={{ marginRight: 5, color: 'red' }}> </i>

					{props.user.points}</a>
			</li>

		</ul>
	) : (
			<ul className="nav nav-pills">
				<li><NavLink to="/register" className="btn">Sign up</NavLink></li>
				<li><NavLink to="/login" className="btn">Login</NavLink></li>
			</ul>
		);

	return (
		<div className="circle--header">
			<div className="bounds">
				{navButtons}
			</div>
			<Link to="/list" className="logo-link"><img className="main-logo" src="/images/doctor.svg" alt="logo" /></Link>
		</div>

	)
}

Nav.propTypes = {
	loggedIn: PropTypes.bool.isRequired,
	user: PropTypes.object,
	onLogout: PropTypes.func.isRequired
};

export default Nav;

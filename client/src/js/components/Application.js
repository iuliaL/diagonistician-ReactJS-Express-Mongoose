import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


import Nav from './Nav';
import * as Actions from '../actioncreators/authActions';


const Application = withRouter(connect(mapStateToProps, mapDispatchToProps)(({ history, children, actions, loggedIn, user})=>{
	console.log('APP logged in', loggedIn);
	const logout = ()=> {
		actions.logout(history);
	};
	return (
		<div>
			<Nav loggedIn={loggedIn} onLogout={logout} user={user}/>
			{/*here are the routes*/}
			<div className="bounds">
				{children}
			</div>
		</div>
	)
}));




function mapStateToProps({auth}) { // extract just the auth part of the state
	return {
		loggedIn: auth.loggedIn,
		user: auth.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}
export default Application;

// need withRouter here otherwise Add question button or question links => /add won't work
// Application does not have location property and thus the children won't know about url location, App acts as a blocker
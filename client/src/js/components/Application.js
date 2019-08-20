import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Nav from './Nav';
import * as authActions from '../actioncreators/authActions';


const Application = withRouter(connect(mapStateToProps, mapDispatchToProps)(({ history, children, actions, loggedIn, user }) => {
	const logout = () => {
		actions.logout(history); // need withRouter() to access history prop
	};
	return (
		<div>
			<Nav loggedIn={loggedIn} onLogout={logout} user={user}/>
			{/*here come the routes*/}
			<div className="bounds">
				{children}
			</div>
		</div>
	)
}));


function mapStateToProps({ auth }) { // extract just the auth part of the state
	return {
		loggedIn: auth.loggedIn,
		user: auth.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(authActions, dispatch)
	};
}
export default Application;
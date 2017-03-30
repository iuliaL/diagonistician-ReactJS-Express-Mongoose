import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


import Nav from './Nav';
import * as Actions from '../actioncreators/questionActions';


class Application extends Component{
	render() {
		//console.log('APP PROPS',this.props);
		return (
			<div>
				<Nav loggedIn={this.props.loggedIn} />
				{/*here are the routes*/}
				<div className="bounds">
					{this.props.children}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Application));

// need withRouter here otherwise Add question button or question links => /add won't work
// Application does not have location property and thus the children won't know about url location, App acts as a blocker
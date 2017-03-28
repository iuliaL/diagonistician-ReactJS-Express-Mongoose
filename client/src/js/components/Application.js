import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


import Nav from './Nav';
import * as Actions from '../actioncreators/actions';


class Application extends Component{
	render() {
		console.log('APP props',this.props);
		return (
			<div>
				<Nav loggedIn={false} />
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
		questions: state.questions
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

// need with router here otherwise Add question button or question links => /add won't work
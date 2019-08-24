import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as questionActions from '../actioncreators/questionActions';

import Answer from './Answer';
import { Success, Error } from './Messages';
import TextareForm from './TextareaForm';

class QuestionView extends Component {
	constructor(props) {
		super(props);
		this.fetchOne = props.actions.fetchOne;
		this.voteAnswer = props.actions.voteAnswer;
	}
	static propTypes = {
		question: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		match: PropTypes.object,
		successMessage: PropTypes.string,
		errorMessage: PropTypes.string
	};
	componentWillMount() {
		this.fetchOne(this.props.match.params.qId);
	}
	refreshVoteCount = (arg, answerId) => {
		console.log("refreshing state?", arg, answerId);
		this.voteAnswer(this.props.match.params.qId, answerId, arg)
	};
	render() {
		const { question, successMessage, errorMessage } = this.props;
		let answers;
		if (question.answers) {
			answers = question.answers.map((a) => {
				return (
					<Answer key={a._id}
						id={a._id}
						text={a.text}
						owner={a.owner.username}
						votes={a.votes}
						createdAt={a.createdAt}
						updatedAt={a.updatedAt}
						onVoteCountChanged={this.refreshVoteCount} />
				)
			});
		}
		return (
			<div className="grid-100">
				<h2 className="question-heading">{question.text}</h2>

				<Success msg={successMessage} />
				<Error msg={errorMessage} />

				<hr />
				{answers}
				<h3>Add an Answer</h3>

				<TextareForm
					submitBtnValue="Post answer" 
					placeholder="Your answer..."
					next={(a) => this.props.actions.addAnswer(this.props.match.params.qId, a)} />
			</div>
		)
	}
}

function mapStateToProps({ questions, auth, messages }) {
	return {
		question: questions.question,
		successMessage: messages.successMessage,
		errorMessage: messages.errorMessage,
		loggedIn: auth.loggedIn
	}
}
function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(questionActions, dispatch)
	}
}

export default connect(mapStateToProps, mapActionsToProps)(QuestionView)

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actioncreators/questionActions';

import Answer from './Answer';
import { Success, Error } from './Messages';
import textAreaChangeStateHandler from '../non-redux-state'

class QuestionView extends Component {
	constructor(props) {
		super(props);
		this.state = { text: '', charLeft: 140, tooLong: false };
		this.addAnswer = props.actions.addAnswer;
		this.fetchOne = props.actions.fetchOne;
		this.voteAnswer = props.actions.voteAnswer;
	}
	static propTypes = {
		question: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired,
		match: PropTypes.object,
		successMessage: PropTypes.object,
		errorMessage: PropTypes.object
	};
	componentWillMount() {
		this.fetchOne(this.props.match.params.qId);
	}
	onNewAnswerInput = event => {
		this.setState(textAreaChangeStateHandler(event));
	};
	onNewAnswerSubmit = event => {
		event.preventDefault();
		// post new answer and refresh answer list, the refresh is handled in the actionCreator
		// by fetching again the question and updating state
		const answer = { text: this.state.text };
		this.addAnswer(this.props.match.params.qId, answer)
			.then(() => this.setState({ text: '' }));
	};
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
				<form onSubmit={this.onNewAnswerSubmit}>
					<textarea className="full-width" placeholder="Your answer..." id="message"
						value={this.state.text}
						onChange={this.onNewAnswerInput}>
					</textarea>
					{this.state.charLeft < 130 && this.state.charLeft >= 0 &&
						<span className="chars">&nbsp;You have {this.state.charLeft} characters left</span>}
					{this.state.tooLong && !this.state.text &&
						<span className="chars">Too many characters. Maximum permitted is 140.</span>}
					<input className="button-primary answer" type="submit" value="Post answer" />
				</form>
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

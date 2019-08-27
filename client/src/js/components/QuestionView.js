import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as questionActions from '../actioncreators/questionActions';

import Answer from './Answer';
import { Success, Error } from './Messages';
import TextareForm from './TextareaForm';

QuestionView.propTypes = {
	question: PropTypes.oneOfType([
		() => null,
		PropTypes.object
	  ]),
	actions: PropTypes.object.isRequired,
	match: PropTypes.object,
	successMessage: PropTypes.string,
	errorMessage: PropTypes.string
};

function QuestionView({ match, question, successMessage, errorMessage, actions: { fetchOne, addAnswer, voteAnswer } }) {
	useEffect(() => {
		fetchOne(match.params.qId); // => void here!
	}, []); // this [] is the way to avoid calling the effect on every render

	const refreshVoteCount = (arg, answerId) => {
		voteAnswer(match.params.qId, answerId, arg);
	};

	return question && <div className="grid-100">
		<h2 className="question-heading">{question.text}</h2>

		<Success msg={successMessage} />
		<Error msg={errorMessage} />

		<hr />
		{question.answers.map((a) => {
			return (
				<Answer key={a._id}
					id={a._id}
					text={a.text}
					owner={a.owner.username}
					votes={a.votes}
					createdAt={a.createdAt}
					updatedAt={a.updatedAt}
					onVoteCountChanged={refreshVoteCount} />
			)
		})}
		<h3>Add an Answer</h3>

		<TextareForm
			submitBtnValue="Post answer"
			placeholder="Your answer..."
			next={answer => addAnswer(match.params.qId, answer)} />
	</div>;

}

function mapStateToProps({ questions, auth, messages }) {
	return {
		question: questions.question,
		successMessage: messages.successMessage,
		errorMessage: messages.errorMessage,
		loggedIn: auth.loggedIn
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(questionActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(QuestionView);

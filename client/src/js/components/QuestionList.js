import React from 'react';

// router
import { Route, Redirect } from 'react-router-dom'

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as questionActions from '../actioncreators/questionActions';


// components
import LinkWrap from './LinkWrap';
import Question from './Question';
import TextareaForm from './TextareaForm';
import { Success, Error } from './Messages';
import Loader from './Loader';

// Private route refers to /list/add
const PrivateAddRoute = ({ onAdd, loggedIn, ...rest }) => {
	return (
		<Route {...rest} render={() =>
			loggedIn
				? <TextareaForm submitBtnValue="Ask a doctor"
					placeholder="Provide a context. Describe the case here (signs and symptoms, medical history, ongoing or past medication, etc)"
					next={onAdd}
				/>
				: <Redirect to='/login' />
		} />
	)
};

function QuestionsList({ actions, questions, loggedIn, loading, successMessage, errorMessage, match }) {
	const singleQuestion = q =>
		<div key={q._id}>
			<LinkWrap to={`/question/${q._id}`}>
				<Question id={q._id}
					text={q.text}
					owner={q.owner.username}
					createdAt={q.createdAt}
					updatedAt={q.updatedAt}
				/>
			</LinkWrap>
		</div>;

	const questionList = questions.map(singleQuestion);

	return (
		<div className="grid-100">
			<h1 className="name align-center">Diagnostician</h1>

			<Success msg={successMessage} />
			<Error msg={errorMessage} />

			<Route exact path='/list' render={({ match }) =>
				<LinkWrap exact to={match.url + "/add"}>
					<button className="button-primary ask-question-button form">Ask a question</button>
				</LinkWrap>
			} />

			{/*logged in conditional here*/}
			<PrivateAddRoute
				path={match.url + "/add"}
				loggedIn={loggedIn}
				onAdd={actions.addQuestion}
			/>

			{loading ?
				<Loader text="Loading Cases..." /> :
				(
					<div>
						<h2>Questions</h2>
						<hr />
						<div className="questions">
							{
								questionList.length > 0
									? questionList
									: <p>Nothing was asked yet.</p>
							}
						</div>
					</div>)
			}
		</div>
	)

}

function mapStateToProps({ questions, auth, messages }) {
	return {
		questions: questions.questions,
		loading: questions.loading, // this loading piece of state belongs to questions reducer
		successMessage: messages.successMessage,
		errorMessage: messages.errorMessage,
		loggedIn: auth.loggedIn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(questionActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionsList);
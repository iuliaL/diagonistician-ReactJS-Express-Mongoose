import React, {Component, PropTypes} from 'react';
// router
import { Route, Redirect } from 'react-router-dom'

//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as questionActions from '../actioncreators/questionActions';


// components
import LinkWrap from './LinkWrap';
import Question from './Question';
import NewQuestionForm from './NewQuestionF';
import {Success, Error} from './Messages';

//Private route refers to /list/add
const PrivateAddRoute = ({ component, onAdd, loggedIn ,...rest }) => {
	return (
		<Route {...rest} render={ props =>
			(
				loggedIn ? (
						<NewQuestionForm onAdd={onAdd}/>
					) : (
						<Redirect to='/login'/>
					)
			)
		}/>
	)
};

class QuestionsList extends Component{
	static propTypes = {
		questions: PropTypes.array.isRequired,
	};
	render () {
		const { actions, questions, successMessage, errorMessage } = this.props;
		const { addQuestion } = actions;
		
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
				
				<Success msg= {successMessage} />
				<Error msg= {errorMessage} />
				
				<Route exact path='/list' render={ () =>
					<LinkWrap exact to="/list/add">
						<button className="button-primary ask-question-button question-form">Ask a question</button>
					</LinkWrap>
				}/>
					
				{/*logged in conditional here*/}
				<PrivateAddRoute loggedIn={this.props.loggedIn} path="/list/add" onAdd={addQuestion} component={NewQuestionForm}/>

				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					{questionList}
				</div>
			</div>
		)
	}
}

function mapStateToProps({questions, auth, messages}) {
	return {
		questions: questions.questions,
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
import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
import Loader from './Loader';

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
		const { actions, questions, loading, successMessage, errorMessage } = this.props;
		const { addQuestion } = actions;
		console.log('load', loading )
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
				
				<Route exact path='/list' render={ ({match}) =>
					<LinkWrap exact to={match.url + "/add"}>
						<button className="button-primary ask-question-button question-form">Ask a question</button>
					</LinkWrap>
				}/>
					
				{/*logged in conditional here*/}
				<PrivateAddRoute loggedIn={this.props.loggedIn}
				                 path={this.props.match.url + "/add"}
				                 onAdd={addQuestion}
				                 component={NewQuestionForm}/>
				
				{ loading ?
					<Loader text="Loading Cases"/> :
					(<div>
						<h2>Questions</h2>
						<hr/>
						<div className="questions">
							{questionList}
						</div>
					</div>)
				}
			</div>
		)
	}
}

function mapStateToProps({questions, auth, messages}) {
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
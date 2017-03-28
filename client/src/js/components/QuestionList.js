import React, {Component, PropTypes} from 'react';
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'


import LinkWrap from './LinkWrap';
import Question from './Question';
import NewQuestionForm from './NewQuestionF';
import makeRequest from '../fetchHelper';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actioncreators/actions';


class QuestionsList extends Component{
	defaultProps = {
		pollInterval : 120000,
		url: "http://localhost:8080/api/questions"
	};
	postNewQuestion = (newQuestion) => {
		makeRequest(this.defaultProps.url, 'post', newQuestion)
			.then((response)=> {
					console.log("posted question with id:", response);
					this.props.actions.fetchQuestions(); // refresh results
				})
			.catch((err)=> console.log('Error posting new question',err));
	};
	onNewQuestion = newQuestion => this.postNewQuestion(newQuestion);
	checkIfHasRoute = route => this.props.location.pathname == route;
	render () {
		console.log('q list props', this.props);
		const questions = this.props.questions.map(q => {
			return (
				<LinkWrap key={q._id} to={`/question/${q._id}`}>
					<Question id={q._id}
					          text={q.text}
					          createdAt={q.createdAt}/>
				</LinkWrap>
			)
		}); // and then no need to bind this
		
		return (
			<div className="grid-100">
				<h1 className="name align-center">Diagnostician</h1>
				
				{/*TODO: add user logged in conditionals here*/}
				{!this.checkIfHasRoute('/list/add') &&
					<LinkWrap to="/list/add">
						<button className="button-primary ask-question-button question-form">Ask a question</button>
					</LinkWrap>}
				
				<Switch>
					<Route path='/list/add' render={() => <NewQuestionForm onAdd={this.onNewQuestion}/>}/>
				</Switch>
				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					{questions}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuestionsList);
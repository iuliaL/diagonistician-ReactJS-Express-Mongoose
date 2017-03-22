import React, {Component, PropTypes} from 'react';
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'


import LinkWrap from './LinkWrap';

import Question from './Question';
import NewQuestionForm from './NewQuestionF';
import makeRequest from '../fetchHelper';

export default class QuestionsList extends Component{
	defaultProps = {
		pollInterval : 120000,
		url: "http://localhost:8080/questions"
	};
	state = { questions: []};
	getQuestionsFromServer = () => {
		makeRequest(this.defaultProps.url)
			.then(data =>{
				console.log("Promise result", data);
				this.setState({ questions: data });
			}).catch((err)=> {
				console.log("Error fetching questions", err)
			});
	};
	postNewQuestion = (newQuestion) => {
		makeRequest(this.defaultProps.url, 'post', newQuestion)
			.then((response)=> {
					console.log("posted question with id:", response);
					this.getQuestionsFromServer(); // refresh results
				})
			.catch((err)=> console.log('Error posting new question',err));
	};
	componentDidMount() {
		this.getQuestionsFromServer();
		// optionally poll for new questions every min:
		// setInterval(this.getQuestionsFromServer, this.props.pollInterval )
	}
	onNewQuestion = newQuestion => this.postNewQuestion(newQuestion);
	checkIfHasRoute = route => this.props.location.pathname == route;
	render () {
		const questions = this.state.questions.map(q => {
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


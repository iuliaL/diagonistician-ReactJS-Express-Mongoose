import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import Question from './Question';
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
				//console.log("Promise result", data);
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
	onNewQuestion =(newQuestion) => {
		this.postNewQuestion(newQuestion);
	};
	goToAdd = (event) => {
		event.preventDefault();
		const path = '/add';
		browserHistory.push(path);
	};
	checkIfHasRoute = (route) => {
		return this.props.location.pathname == route;
	};
	render () {
		const newQuestionForm = React.Children.map(this.props.children, child =>{
			return React.cloneElement(child, {
				onAdd: this.onNewQuestion // add onAdd callback to NewQuestionForm
			});
		});
		const questions = this.state.questions.map(q => {
			return (
				<LinkContainer key={q._id} to={`/question/${q._id}`}>
					<Button>
						<Question id={q._id}
						          text={q.text}
						          createdAt={q.createdAt}/>
					</Button>
				</LinkContainer>
			)
		}); // and then no need to bind this
		
		return (
			<div className="grid-100">
				<h1 className="name align-center">Diagnostician</h1>
				{/*TODO: add user logged in conditionals here*/}
				{!this.checkIfHasRoute('/add') &&
				<button className="button-primary ask-question-button" onClick={this.goToAdd}>Ask a question</button>}
				{newQuestionForm}
				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					{questions}
				</div>
			</div>
		)
	}
	
}


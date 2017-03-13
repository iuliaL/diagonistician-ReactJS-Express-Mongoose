import React, {Component, PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

import NewQuestionForm from './NewQuestionF';
import Question from './Question';

export default class QuestionsList extends Component{
	defaultProps = {
		pollInterval : 120000,
		url: "http://localhost:3000/questions"
	};
	state = { questions: []};
	getQuestionsFromServer = () => {
		$.get(this.defaultProps.url)
			.then((result)=> {
				console.log("Promise result", result);
				this.setState({ questions: result });
			})
			.catch((err)=> {
				console.log("error", err)
			})
			.always(function() {
				console.log("finally");
			});
	};
	postNewQuestion = (newQuestion) => {
		$.post(this.defaultProps.url, newQuestion, function(result){
			console.log("posted question with id:", result);
			this.getQuestionsFromServer(); // refresh results
		}.bind(this));
	};
	componentDidMount() {
		this.getQuestionsFromServer();
		// optionally poll for new questions every min:
		// setInterval(this.getQuestionsFromServer, this.props.pollInterval )
	}
	onNewQuestion =(newQuestion) => {
		this.postNewQuestion(newQuestion);
	};
	render () {
		const questions = this.state.questions.map(function(q, index) {
			return (
				<LinkContainer key={q._id} to={`/question/${q._id} `}>
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
				<h1 className="name align-center">Code Q&amp;A</h1>
				<NewQuestionForm onAdd={this.onNewQuestion}/>
				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					{questions}
				</div>
			</div>
		)
	}
	
}
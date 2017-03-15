import React, {Component, PropTypes} from 'react';
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
	onNewQuestion =(newQuestion) => {
		this.postNewQuestion(newQuestion);
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
				{newQuestionForm}
				{/* this.props.children  meaning NewQuestionForm*/}
				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					{questions}
				</div>
			</div>
		)
	}
	
}


import React,{PropTypes, Component} from 'react';

import Answer from './Answer';
import makeRequest from '../fetchHelper';


export default class QuestionView extends Component{
	constructor(props){
		super(props);
		console.log('Props',props);
		this.defaultProps = {
			baseUrl : "http://localhost:8080/questions/",
			qId : '00000000000'
		};
		this.state = {
			question : {
				text: '',
				answers: []
			},
			newAnswer: ''
		};
	}
	componentDidMount() {
		this.getAnswersFromServer();
	}
	getAnswersFromServer = () => {
		makeRequest(`${this.defaultProps.baseUrl}${this.props.params.qId}`) // taking question id from url params
			.then(data =>{
				console.log("get question result", data);
				this.setState({ question: data });
			})
			.catch((err) => console.log("error", err))
	};
	onNewAnswerInput = event  => this.setState({ newAnswer : event.target.value });
	onNewAnswerSubmit = event => {
		event.preventDefault();
		// post new answer and refresh answer list
		const url = encodeURI(`${this.defaultProps.baseUrl}${this.props.params.qId}/answers`);
		const data = { text: this.state.newAnswer };
		makeRequest(url,'POST', data).then(result => {
			console.log("posted new answer", result);
			this.getAnswersFromServer(); // refresh results
			this.setState({newAnswer: ""}); // reset textArea
		});
	};
	refreshVoteCount = (arg, answerId) =>{
		console.log("refreshing state?", arg, answerId);
		// arg will be either "up" or "down"
		const url = encodeURI(`${this.defaultProps.baseUrl}${this.props.params.qId}/answers/${answerId}/vote-${arg}`);
		makeRequest(url, 'POST').then (()=>{
			console.log("Voted", arg);
			this.getAnswersFromServer();
		});
	};
	render() {
		const answers = this.state.question.answers.map((a,index) => {
			return (
				<Answer key={a._id}
				        id={a._id}
				        text={a.text}
				        votes={a.votes}
				        createdAt={ moment(a.createdAt).format("MMMM Do YYYY, h:mm:ss A") }
				        updatedAt={ moment(a.updatedAt).format("MMMM Do YYYY, h:mm:ss A") }
				        questionNamespace={this.defaultProps.baseUrl + this.props.params.qId + '/answers/'}
				        onVoteCountChanged={this.refreshVoteCount}/>
			)
		});
		return (
			<div className="grid-100">
				<h2 className="question-heading">{this.state.question.text}</h2>
				<hr/>
				{answers}
				<h3>Add an Answer</h3>
				<form onSubmit={this.onNewAnswerSubmit}>
					<textarea className="full-width" placeholder="Your answer..." id="message"
					          value={this.state.newAnswer}
					          onChange={this.onNewAnswerInput}>
					</textarea>
					<input className="button-primary answer" type="submit" value="Post answer"/>
				</form>
			</div>
		)
	}
}

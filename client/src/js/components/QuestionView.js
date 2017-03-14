import React,{PropTypes, Component} from 'react';

import Answer from './Answer';

export default class QuestionView extends Component{
	constructor(props){
		super(props);
		this.defaultProps = {
			baseUrl : "http://localhost:3000/questions/",
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
		$.get(this.defaultProps.baseUrl + this.props.params.qId) // taking question id from url params
			.then((result) =>{
				console.log("ajax result", result);
				this.setState({ question: result });
			})
			.catch(function(err) {
				console.log("error", err)
			}.bind(this))
			.always(function() {
				console.log("finally");
			}.bind(this));
	};
	onNewAnswerInput = event  => this.setState({ newAnswer : event.target.value });
	onNewAnswerSubmit = event => {
		event.preventDefault();
		// post new answer and refresh answer list
		let url = encodeURI(this.defaultProps.baseUrl + this.props.params.qId.trim() + '/answers');
		// needed to trim the param don't know why i had a whitespace :(
		let data = { text: this.state.newAnswer };
		$.post(url, data, result => {
			console.log("posted new answer", result);
			this.getAnswersFromServer(); // refresh results
			this.setState({newAnswer: ""}); // reset textArea
		});
		
	};
	refreshVoteCount = (arg, answerId) =>{
		console.log("refreshing state?", arg, answerId);
		// arg will be either "up" or "down"
		let url = encodeURI(this.defaultProps.baseUrl + this.props.params.qId.trim() + '/answers/'+ answerId +'/vote-');
		$.post(`${url}${arg}`, ()=>{
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
				        questionNamespace={this.defaultProps.baseUrl + this.props.params.qId.trim() + '/answers/'}
				        onVoteCountChanged={this.refreshVoteCount}/>
			)
		});
		return (
			<div className="grid-100">
				<h2 className="question-heading">{this.state.question.text}</h2>
				<hr/>
				<h3>Add an Answer</h3>
				{answers}
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
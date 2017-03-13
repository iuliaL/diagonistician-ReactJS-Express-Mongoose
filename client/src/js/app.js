// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// Components
import QuestionList  from './components/QuestionList'

var QuestionView = React.createClass({
	getDefaultProps: function(){
		return {
			baseUrl : "http://localhost:3000/questions/",
			qId : '00000000000'
		}
	},
	getInitialState: function () {
		return {
			question : {
				text: '',
				answers: []
				
			},
			newAnswer: ''
		}
	},
	getAnswersFromServer : function() {
		$.get(this.props.baseUrl + this.props.params.qId) // taking question id from url params
			.then(function(result) {
				console.log("ajax result", result);
				this.setState({ question: result });
			}.bind(this))
			.catch(function(err) {
				console.log("error", err)
			}.bind(this))
			.always(function() {
				console.log("finally");
			}.bind(this));
	},
	componentDidMount: function () {
		this.getAnswersFromServer();
	},
	onNewAnswerInput : function (event) {
		this.setState({ newAnswer : event.target.value });
	},
	onNewAnswerSubmit : function (event) {
		event.preventDefault();
		// post new answer and refresh answer list
		let url = encodeURI(this.props.baseUrl + this.props.params.qId.trim() + '/answers');
		// needed to trim the param don't know why i had a whitespace :(
		let data = { text: this.state.newAnswer };
		$.post(url, data, function(result){
			console.log("posted new answer", result);
			this.getAnswersFromServer(); // refresh results
			this.setState({ newAnswer : ""} ); // reset textArea
		}.bind(this));
		
	},
	refreshVoteCount : function (arg, answerId) {
		console.log("refreshing state?", arg, answerId);
		// arg will be either "up" or "down"
		let url = encodeURI(this.props.baseUrl + this.props.params.qId.trim() + '/answers/'+ answerId +'/vote-');
		$.post(`${url}${arg}`, function(){
			console.log("Voted", arg);
			this.getAnswersFromServer();
		}.bind(this));
	},
	render: function () {
		var answers = this.state.question.answers.map(function(a,index) {
			return (
				<Answer key={a._id}
				        id={a._id}
				        text={a.text}
				        votes={a.votes}
				        createdAt={ moment(a.createdAt).format("MMMM Do YYYY, h:mm:ss A") }
				        updatedAt={ moment(a.updatedAt).format("MMMM Do YYYY, h:mm:ss A") }
						questionNamespace={this.props.baseUrl + this.props.params.qId.trim() + '/answers/'}
						onVoteCountChanged={this.refreshVoteCount}/>
			)
		}.bind(this)); // and then no need to bind this
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
});

function Votes (props) {
	return (
		<div className="answer-voting">
			<span className="icon-chevron-up" onClick={ function(){ props.onVote('up') } }> </span>
			<strong className="vote-count">{props.votes}</strong>
			<span className="icon-chevron-down" onClick={ function() { props.onVote('down')} }> </span>
		</div>
	)

}

const Answer = (props) => {
	console.log('DEBUGS');
	onVoteChange = arg => {
		console.log("on vote ", arg);
		props.onVoteCountChanged(arg, props.id);
	};
	return (
		<div className="grid-parent answer-container">
			<div className="grid-10">
				<Votes votes={props.votes} onVote={onVoteChange}/>
			</div>
			<div className="grid-90">
				<p style={{'color': 'black', 'fontWeight': 600}}>{this.props.text}</p>
				
				<div className="align-right">
					<small>Answered <strong>{props.createdAt}</strong> | </small>
					<small>Modified <strong>{props.updatedAt}</strong></small>
				</div>
			</div>
		</div>
	)

};
	
function Application(props){
	return (
		<div className="bounds">
			{/*here are the routes*/}
			{props.children}
		</div>
	)
}

render((
	<Router history={browserHistory}>
		<Route component={Application}>
			<Route path="/" component={QuestionList}/>
			<Route path="question/:qId" component={QuestionView}/>
		</Route>
	</Router>
	),document.getElementById('container'));

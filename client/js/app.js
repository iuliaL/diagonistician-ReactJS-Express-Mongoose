// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';



var NewQuestionForm = React.createClass({
	// don't think these propTypes are necessary
	propTypes : {
		onAdd: React.PropTypes.func.isRequired
	},
	getInitialState :  function () {
		return {
			text: ""
		}
	},
	onQuestionChange:  function (event) {
		//console.log('typing new question... ', event.target.value);
		this.setState({
			text: event.target.value
		})
	},
	onSubmit: function (event) {
		event.preventDefault();
		var questionText = this.state.text.trim();
		if (!questionText) {
			return;
		}
		this.props.onAdd({ text: questionText} ); // onAdd is a callback prop, it passes the question = { text: questionText} back up to Application parent
		this.setState({text: ""}); // reset input value on form submit
	},
	render: function () {
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<div className="grid-parent">
					<div className="grid-100 circle--input--group">
						<input type="text" placeholder="What's your question?" id="question"
						       value={this.state.text}
						       onChange={this.onQuestionChange}/>
						<input className="button-primary question" type="submit" value="Ask"/>
					</div>
				</div>
			</form>
		)
	}
});



function Question (props) {
	var createdAt = moment(props.createdAt).format("MMMM Do YYYY, h:mm:ss A");
	return (
		<div className="grid-parent question">
			<div className="grid-10">
				<img className="avatar" src="images/avatar.png" alt="avatar"/>
			</div>
			<div className="grid-90">
				<p>{props.text}</p>
				<small className="align-right block">Asked <strong>{createdAt}</strong></small>
			</div>
		</div>
	)
}

Question.propTypes = {
	id: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired,
	createdAt: React.PropTypes.string
};

var Questions_list = React.createClass({
	getDefaultProps : function() { // initializing props here, these can be overridden
		return {
			pollInterval : 120000,
			url: "http://localhost:3000/questions"
		}
	},
	getInitialState: function () {
		return {
			questions: []
		}
	},
	getQuestionsFromServer : function() {
		$.get(this.props.url)
			.then(function(result) {
				console.log("ajax result", result);
				this.setState({ questions: result });
			}.bind(this))
			.catch(function(err) {
				console.log("error", err)
			}.bind(this))
			.always(function() {
				console.log("finally");
			}.bind(this));
	},
	postNewQuestion: function (newQuestion) {
		$.post(this.props.url, newQuestion, function(result){
			console.log("posted question with id:", result);
			this.getQuestionsFromServer(); // refresh results
		}.bind(this));
	},
	componentDidMount: function () {
		this.getQuestionsFromServer();
		// optionally poll for new questions every min:
		// setInterval(this.getQuestionsFromServer, this.props.pollInterval )
	},
	onNewQuestion: function (newQuestion) {
		this.postNewQuestion(newQuestion);
	},
	render: function () {
		var questions = this.state.questions.map(function(q, index) {
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
	
});

var Question_view = React.createClass({
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

var Answer = React.createClass({
	onVoteChange: function (arg) {
		console.log("on vote ", arg);
		this.props.onVoteCountChanged(arg,this.props.id);
	},
	render: function () {
		return (
			<div className="grid-parent answer-container">
				<div className="grid-10">
					<Votes votes={this.props.votes} onVote={this.onVoteChange}/>
				</div>
				<div className="grid-90">
					<p style={{'color': 'black', 'fontWeight': 600}}>{this.props.text}</p>
					
					<div className="align-right">
						<small>Answered <strong>{this.props.createdAt}</strong> | </small>
						<small>Modified <strong>{this.props.updatedAt}</strong></small>
					</div>
				</div>
			</div>
		)
	}
});
	
var Application = React.createClass({
	render:  function () {
		return (
			<div className="bounds">
				{/*here are the routes*/}
				{this.props.children}
			</div>
		)
	}
});

render((
	<Router history={browserHistory}>
		<Route component={Application}>
			<Route path="/" component={Questions_list}/>
			<Route path="question/:qId" component={Question_view}/>
		</Route>
	</Router>
	),document.getElementById('container'));
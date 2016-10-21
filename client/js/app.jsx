
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
						<input type="text" placeholder="What's your question?" id="question" value={this.state.text} onChange={this.onQuestionChange}/>
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
				<a href="question.html" data-id={props.id}>
					<p>{props.text}</p>
					<small className="align-right block">Asked <strong>{createdAt}</strong></small>
				</a>
			</div>
		</div>
	)
}

Question.propTypes = {
	id: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired,
	createdAt: React.PropTypes.string
};

var Application = React.createClass({
	getInitialState: function () {
		return {
			questions: []
		}
	},
	getQuestionsFromServer : function() {
		this.serverRequest = $.get(this.props.url)
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
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},
	onNewQuestion: function (newQuestion) {
		this.postNewQuestion(newQuestion);
	},
	render: function () {
		var questions = this.state.questions.map(function(q, index) {
			return (
				<Question key={q._id} id={q._id} text={q.text} createdAt={q.createdAt}/>
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


ReactDOM.render(<Application url="http://localhost:3000/questions" pollInterval="60000" />, document.getElementById('container'));

// var NewQuestionForm = React.createClass({
// 	propTypes : {
// 		onAdd: React.PropTypes.func.isRequired
// 	},
// 	getInitialState :  function () {
// 		return {
// 			question: ""
// 		}
// 	},
// 	onQuestionChange:  function (event) {
// 		console.log('new question:', event.target.value);
// 		this.setState({
// 			question: event.target.value
// 		})
// 	},
// 	onSubmit: function (event) {
// 		event.preventDefault();
// 		this.props.onAdd(this.state.question);
// 		this.setState({question: ""}); // reset input value
// 	},
// 	render: function () {
// 		return (
// 			<form className="question-form" onSubmit={this.onSubmit}>
// 				<div className="grid-parent">
// 					<div className="grid-100 circle--input--group">
// 						<input type="text" placeholder="What's your question?" id="question" value={this.state.question} onChange={this.onQuestionChange}/>
// 						<input className="button-primary question" type="submit" value="Ask"/>
// 					</div>
// 				</div>
// 			</form>
// 		)
// 	}
// });



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
	componentDidMount: function() {
		this.serverRequest = $.get(this.props.source , function (result) {
			console.log("ajax result",result);
			this.setState({ questions: result });
		}.bind(this));
	},
	componentWillUnmount: function() {
		this.serverRequest.abort();
	},
	render: function () {
		return (
			<div className="grid-100">
				<h1 className="name align-center">Code Q&amp;A</h1>
				{/*<NewQuestionForm onAdd=""/>*/}
				<h2>Questions</h2>
				<hr/>
				<div className="questions">
					 {this.state.questions.map(function(q, index) {
						 return (
							 <Question key={q._id} id={q._id} text={q.text} createdAt={q.createdAt}/>
						 )
					 }.bind(this))}
				</div>
			</div>
		)
	}
});


ReactDOM.render(<Application source="http://localhost:3000/questions" />, document.getElementById('container'));
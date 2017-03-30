import React,{PropTypes, Component} from 'react';
//redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actioncreators/actions';

import Answer from './Answer';
import makeRequest from '../fetchHelper';

class QuestionView extends Component{
	constructor(props){
		super(props);
		this.state = { newAnswer: '' };
		this.addAnswer = props.actions.addAnswer;
		this.fetchOne = props.actions.fetchOne;
	}
	componentWillMount() {
		this.fetchOne(this.props.match.params.qId);
	}
	onNewAnswerInput = event => this.setState({ newAnswer : event.target.value });
	onNewAnswerSubmit = event => {
		event.preventDefault();
		// post new answer and refresh answer list, the refresh is handled in the actionCreator
		// by fetching again the question and updating state
		const answer = { text: this.state.newAnswer };
		this.addAnswer(this.props.match.params.qId, answer)
	};
	refreshVoteCount = (arg, answerId) =>{
		console.log("refreshing state?", arg, answerId);
		// arg will be either "up" or "down"
		const url = encodeURI(`${this.defaultProps.baseUrl}${this.props.match.params.qId}/answers/${answerId}/vote-${arg}`);
		makeRequest(url, 'POST').then (()=>{
			console.log("Voted", arg);
			this.getAnswersFromServer();
		});
	};
	render() {
		const { question } = this.props;
		let answers;
		if(question.answers) {
			answers = question.answers.map((a,index) => {
				return (
					<Answer key={a._id}
					        id={a._id}
					        text={a.text}
					        votes={a.votes}
					        createdAt={ moment(a.createdAt).format("MMMM Do YYYY, h:mm:ss A") }
					        updatedAt={ moment(a.updatedAt).format("MMMM Do YYYY, h:mm:ss A") }
					        onVoteCountChanged={this.refreshVoteCount}/>
				)
			});
		}
		return (
			<div className="grid-100">
				<h2 className="question-heading">{question.text}</h2>
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

function mapStateToProps(state) {
	return {
		question : state.question
	}
}
function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions,dispatch)
	}
}

export default connect(mapStateToProps,mapActionsToProps)(QuestionView)

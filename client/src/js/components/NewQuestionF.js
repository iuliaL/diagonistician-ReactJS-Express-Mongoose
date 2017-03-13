/**
 * Created by Iulia on 3/13/17.
 */
import React, {Component, PropTypes} from 'react';

export default class NewQuestionForm extends Component{
	static propTypes = {
		onAdd: PropTypes.func.isRequired
	};
	state = { text : ''};
	onQuestionChange = event => {
		console.log('Typing new question... ', event.target.value);
		this.setState({
			text: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		const questionText = this.state.text.trim();
		if (!questionText) {
			return;
		}
		this.props.onAdd({ text: questionText} ); // onAdd is a callback prop, it passes the question = { text: questionText} back up to Application parent
		this.setState({text: ""}); // reset input value on form submit
	};
	render(){
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
}
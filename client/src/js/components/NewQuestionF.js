/**
 * Created by Iulia on 3/13/17.
 */
import React, {Component, PropTypes} from 'react';

import {submitBtnClasses} from '../dynamicStyles';

class NewQuestionForm extends Component{
	state = { text : ''};
	onQuestionChange = event => {
		this.setState({
			text: event.target.value
		})
	};
	onSubmit = event => {
		event.preventDefault();
		const questionText = this.state.text.trim();
		if (!questionText) {
			return;
		}
		this.props.onAdd({ text: questionText} ); // onAdd is a callback prop, it passes the question = { text: questionText} back up to store
		this.setState({text: ""}); // reset input value on form submit
	};
	render(){
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<div className="grid-parent">
					<div className="grid-100">
						<textarea type="text" placeholder="Tell us about your symptoms, medical history..." id="question"
						       value={this.state.text}
						       onChange={this.onQuestionChange}/>
						<input className={submitBtnClasses(!this.state.text)} type="submit" value="Ask a doctor"/>
					</div>
				</div>
			</form>
		)
	}
}
export default NewQuestionForm
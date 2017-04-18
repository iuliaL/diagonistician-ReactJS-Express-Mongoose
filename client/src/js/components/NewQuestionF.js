/**
 * Created by Iulia on 3/13/17.
 */
import React, {Component, PropTypes} from 'react';

import {submitBtnClasses} from '../dynamicStyles';

class NewQuestionForm extends Component{
	state = { text : '', charLeft: 140, tooLong : false };
	onQuestionChange = event => {
		if (event.target.value.length > 140){
			return this.setState({ tooLong : true})
		}
		this.setState({
			text: event.target.value.length > 140 ? this.state.text : event.target.value,
			charLeft: this.state.charLeft >= -1 ? 140 - event.target.value.length : 0,
			tooLong: false
		});
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
						<textarea type="text" placeholder="Provide a context. Describe the case here (signs and symptoms, medical history, ongoing or past medication, etc)" id="question"
						       value={this.state.text}
						       onChange={this.onQuestionChange}/>
						{this.state.charLeft < 130 && this.state.charLeft >= 0 &&
							<span className="chars">&nbsp;You have {this.state.charLeft} characters left</span>}
						{this.state.tooLong && !this.state.text &&
							<span className="chars">Too many characters. Maximum permitted is 140.</span>}
						<input className={submitBtnClasses(!this.state.text)} type="submit" value="Ask a doctor"/>
					</div>
				</div>
			</form>
		)
	}
}
export default NewQuestionForm
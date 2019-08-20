/**
 * Created by Iulia on 3/13/17.
 */
import React, { useState } from 'react';

import {submitBtnClasses} from '../dynamicStyles';

export default function NewQuestionForm ({ onAdd }) {
	const initialState = { text : '', charLeft: 140, tooLong : false };
	const [state, setFormState] = useState(initialState);

	const onQuestionChange = event => {
		const inputLength = event.target.value.length;
		const inputTooLong = inputLength > 140;
		inputTooLong
			? setFormState({ ...state, tooLong: true})
			: setFormState({
				text: event.target.value.length > 140 ? state.text : event.target.value,
				charLeft: state.charLeft >= -1 ? 140 - event.target.value.length : 0,
				tooLong: false
			});
	};

	const onSubmit = event => {
		event.preventDefault();
		const questionText = state.text.trim();
		if (!questionText) {
			return;
		}
		onAdd({ text: questionText} ); // onAdd is a callback prop, it passes the question = { text: questionText} back up to store
		setFormState(initialState); // reset input value on form submit
	};

	return (
		<form className="question-form" onSubmit={onSubmit}>
			<div className="grid-parent">
				<div className="grid-100">
					<textarea
						type="text"
						placeholder="Provide a context.
							Describe the case here (signs and symptoms, medical history, ongoing or past medication, etc)"
						id="question"
						value={state.text}
						onChange={onQuestionChange}/>
					{state.charLeft < 130 && state.charLeft >= 0 &&
						<span className="chars">&nbsp;You have {state.charLeft} characters left</span>}
					{state.tooLong && state.text &&
						<span className="chars">Too many characters. Maximum permitted is 140.</span>}
					<input className={submitBtnClasses(!state.text)} type="submit" value="Ask a doctor"/>
				</div>
			</div>
		</form>
	);
}
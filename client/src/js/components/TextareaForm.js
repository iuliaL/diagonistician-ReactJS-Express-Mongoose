/**
 * Created by Iulia on 3/13/17.
 */
import React, { useState } from 'react';

import { submitBtnClasses } from '../dynamicStyles';

export default function TextareaForm({ placeholder, submitBtnValue, next }) {
    const initialState = { text: '', charLeft: 140, tooLong: false };
    const [state, setFormState] = useState(initialState);

    const onChange = event => {
        const inputLength = event.target.value.length;
        const inputTooLong = inputLength > 140;
        inputTooLong
            ? setFormState({ ...state, tooLong: true })
            : setFormState({
                text: event.target.value.length > 140 ? state.text : event.target.value,
                charLeft: state.charLeft >= -1 ? 140 - event.target.value.length : 0,
                tooLong: false
            });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const text = state.text.trim();
        if (!text) {
            return;
        }
        next({ text }); // next is a callback prop, it passes the question = { text: questionText} back up to store
        setFormState(initialState); // reset input value on form submit
    };

    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="grid-parent">
                <div className="grid-100">
                    <textarea
                        placeholder={placeholder}
                        value={state.text}
                        onChange={onChange} />
                    {state.charLeft < 130 && state.charLeft >= 0 &&
                        <span className="chars">&nbsp;You have {state.charLeft} characters left</span>}
                    {state.tooLong && state.text &&
                        <span className="chars">Too many characters. Maximum permitted is 140.</span>}
                    <input className={submitBtnClasses(!state.text)}
                        type="submit"
                        value={submitBtnValue}
                    />
                </div>
            </div>
        </form>
    );
}
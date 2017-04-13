import React, { PropTypes} from 'react';

import FormattedDate from './FormattedDate';

function Question (props) {
	return (
		<div className="grid-parent question">
			<div className="grid-10">
				<img className="avatar" src="/images/case.png" alt="avatar"/>
			</div>
			<div className="grid-90">
				<p>{props.text}</p>
				<div className="align-right">
					<small>Asked by <strong>{props.owner}</strong></small><br/>
					<small>on <FormattedDate date={props.createdAt}/> | </small>
					<small>Modified <FormattedDate date={props.updatedAt}/></small>
				</div>
			</div>
		</div>
	)
}

Question.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.string
};

export default Question;
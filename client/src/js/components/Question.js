import React from 'react';
import PropTypes from 'prop-types';

import FormattedDate from './FormattedDate';

export default function Question({ owner, text, createdAt, updatedAt}) {
	return (
		<div className="grid-parent question">
			<div className="grid-10">
				<img className="avatar" src="/images/case.png" alt="avatar" />
			</div>
			<div className="grid-90">
				<p>{text}</p>
				<div className="align-right">
					<small>Asked by <strong>{owner}</strong></small><br />
					<small>on <FormattedDate date={createdAt} /> | </small>
					<small>Modified <FormattedDate date={updatedAt} /></small>
				</div>
			</div>
		</div>
	)
}

Question.propTypes = {
	owner: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired
};


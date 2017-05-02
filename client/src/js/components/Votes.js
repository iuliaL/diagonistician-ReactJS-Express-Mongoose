import React from 'react';
import PropTypes from 'prop-types';

function Votes (props) {
	return (
		<div className="answer-voting">
			<span className="icon-chevron-up" onClick={ props.onVote.bind(null, 'up') }> </span>
			<strong className="vote-count">{props.votes}</strong>
			<span className="icon-chevron-down" onClick={ () => { props.onVote('down')} }> </span>
		</div>
	)
}

Votes.propTypes = {
	onVote: PropTypes.func.isRequired,
	votes: PropTypes.number.isRequired
};

export default Votes;

import React, {PropTypes} from 'react';

function Votes (props) {
	return (
		<div className="answer-voting">
			<span className="icon-chevron-up" onClick={ function(){ props.onVote('up') } }> </span>
			<strong className="vote-count">{props.votes}</strong>
			<span className="icon-chevron-down" onClick={ function() { props.onVote('down')} }> </span>
		</div>
	)
}

Votes.propTypes = {
	onVote: PropTypes.func.isRequired,
	votes: PropTypes.number.isRequired
};

export default Votes;

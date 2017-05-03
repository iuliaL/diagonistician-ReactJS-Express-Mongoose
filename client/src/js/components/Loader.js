import React from 'react';
import PropTypes from 'prop-types';


export default class Loader extends React.Component{
	constructor(props){
		super(props)
	}
	static propTypes = {
		text: PropTypes.string.isRequired
	};
	static defaultProps = {
		text: "Loading",
		styles : {
			fontSize: 25,
			textAlign: 'center'
		},
		speed : 300
	};
	state = {
		text: this.props.text
	};
	componentDidMount(){
		const stopWhenLookingLike = this.props.text + "...";  // Loading...
		this.interval = setInterval(()=> {
			if(this.state.text === stopWhenLookingLike){
				this.setState(()=> ({text: this.props.text }))
			} else {
				this.setState(prevState => ({text: prevState.text + '.'}))
			}
		}, this.props.speed)
	}
	componentWillUnmount(){
		clearInterval(this.interval);
	}
	render(){
		return (
			<p style={this.props.styles}>
				{this.state.text}
			</p>
		)
	}
}
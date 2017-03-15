/**
 * Created by Iulia on 3/13/17.
 */
import React, {Component, PropTypes} from 'react';

export default class RegisterForm extends Component{
	static propTypes = {
		route: PropTypes.shape({
			onAdd: PropTypes.func.isRequired
			})
	};
	state = { username : '', password: ''};
	onInputChange = (event) => {
		console.log('Typing ... ', event.target.value);
		const what = event.target.name;
		this.setState({
			[what]: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		const username = this.state.username.trim();
		const password = this.state.password.trim();
		if (!username || !password) {
			alert('Please type username and password!');
			return;
		}
		this.props.route.onAdd({ username, password });
		this.setState({ username : '', password: ''});
	};
	render(){
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<h1>Register</h1>
				<div className="grid-parent">
					<div className="grid-100">
						<input type="text" placeholder="Username"
					          value={this.state.username} name="username"
					          onChange={this.onInputChange}
						/>
						<input type="password" placeholder="Password"
							value={this.state.password}
						    name="password" onChange={this.onInputChange}
						/>
						<input className="button-primary ask-question-button" type="submit" value="Register"/>
					</div>
				</div>
			</form>
		)
	}
}
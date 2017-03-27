/**
 * Created by Iulia on 3/13/17.
 */
'use strict';

import React, { Component, PropTypes} from 'react';
import { withRouter } from 'react-router';
import makeRequest from '../fetchHelper';


class RegisterForm extends Component{
	static propTypes = {
		route: PropTypes.shape({
			onAdd: PropTypes.func.isRequired
		})
	};
	state = { username : '', password: ''};
	onInputChange = (event) => {
		//console.log('Typing ... ', event.target.value);
		const what = event.target.name;
		this.setState({
			[what]: event.target.value
		})
	};
	onSubmit = (event) => {
		event.preventDefault();
		const username = this.state.username.trim();
		const password = this.state.password;
		if (!username || !password) {
			alert('Please type username and password!');
			return;
		}
		this.props.onAdd({ username, password });
		this.login({ username, password })
		//TODO redirect after login
			.then(()=>console.log("Redirect me to questions"));
		//this.setState({ username : '', password: ''});
	};
	login = (user) => {
		const url = 'http://localhost:8080/auth/login';
		const credentials = btoa(`${user.username}:${user.password}`);
		return makeRequest(url, "POST", null, null, { Authorization: `Basic ${credentials}` })
			.then((response)=> {
				console.log('User logged in successfully', response);
				localStorage.setItem('jwt', response.token);
			})
			.catch((e)=> console.log('Could not log in user',e));
	};
	logout = () => {
		const url = 'http://localhost:8080/auth/logout';
		return makeRequest(url, "GET")
			.then((response)=> {
				console.log(response.message);
				localStorage.removeItem('jwt');
			})
			.catch((e)=> console.log('Could not logout user',e));
	};
	render(){
		return (
			<form className="question-form" onSubmit={this.onSubmit}>
				<h1>Login</h1>
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
						<input className="button-primary ask-question-button" type="submit" value="Login"/>
						<input className="button-secondary ask-question-button" type="button" onClick={this.logout} value="Logout"/>
					</div>
				</div>
			</form>
		)
	}
}

export default withRouter(RegisterForm)
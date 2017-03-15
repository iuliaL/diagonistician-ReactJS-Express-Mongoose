// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Components
import QuestionList  from './components/QuestionList'
import QuestionView from './components/QuestionView';
import RegisterForm from './components/RegisterForm';

import NewQuestionForm from './components/NewQuestionF';


function Application(props){
	const onNewUser = (user) => console.log(user);
	return (
		<div className="bounds">
			{/*here are the routes*/}
			{props.children}
		</div>
	)
}

render((
	<Router history={browserHistory}>
		<Route component={Application}>
			<Route path="/" component={QuestionList}>
				<Route path='add' component={NewQuestionForm}/>
			</Route>
			<Route path="question/:qId" component={QuestionView}/>
			{/*<Route path="login" component={LoginForm}/>*/}
			<Route path="register" component={RegisterForm} onAdd={(user)=>{console.log('user',user)}}/>
			{/* got the user credentials till here*/}
		</Route>
	</Router>
	),document.getElementById('container'));

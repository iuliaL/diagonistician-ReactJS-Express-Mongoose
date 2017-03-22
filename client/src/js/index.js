// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory' // this works like this

// Components
import QuestionList  from './components/QuestionList'
import QuestionView from './components/QuestionView';
import RegisterForm from './components/RegisterForm';

const history = createBrowserHistory();

function Application(props){
	return (
		<div className="bounds">
			{/*here are the routes*/}
			{props.children}
		</div>
	)
}

render((
	<Router history={history}>
		<Application>
			<Switch>
				<Route path="/list" component={QuestionList}/>
				<Route path="/question/:qId" component={QuestionView}/>
				{/*<Route path="login" component={LoginForm}/>*/}
				<Route path="/register" render={()=> <RegisterForm onAdd={(user)=>console.log(user)}/>}/>
				{/* my register POST will be in this register form for the moment */}
				{/* got the user credentials till here*/}
			</Switch>
		</Application>
	</Router>
	),document.getElementById('container'));

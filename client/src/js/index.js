// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Components
import QuestionList  from './components/QuestionList'
import QuestionView from './components/QuestionView';

function Application(props){
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
			<Route path="/" component={QuestionList}/>
			<Route path="question/:qId" component={QuestionView}/>
		</Route>
	</Router>
	),document.getElementById('container'));

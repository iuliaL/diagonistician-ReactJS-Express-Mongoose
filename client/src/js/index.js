// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import {
	Router,
	Route,
	Switch
} from 'react-router-dom'

//REDUX imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Redux middleware
import thunk from 'redux-thunk'; // lets us dispatch() functions async
import logger from 'redux-logger'; // nice state console.logs

import AppReducer from './reducers/AppReducer';
import { fetchQuestions } from './actioncreators/questionActions'

import createBrowserHistory from 'history/createBrowserHistory' // this works like this

// Components
import Application from './components/Application';
import NotFound  from './components/NotFound';
import QuestionList  from './components/QuestionList'
import QuestionView from './components/QuestionView';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const history = createBrowserHistory();
const store = createStore(AppReducer, applyMiddleware(thunk, logger));

store.dispatch(fetchQuestions()); // fetching questions at the highest level of the app

render((
	<Provider store={store}>
		<Router history={history}>
			<Application>
				<Switch>
					<Route path="/list" component={QuestionList}/>
					<Route path="/question/:qId" component={QuestionView}/>
					<Route path="/login" render={()=> <LoginForm onAdd={(user)=>console.log(user)}/>}/>
					<Route path="/register" render={()=> <RegisterForm onAdd={(user)=>console.log(user)}/>}/>
					{/* my register POST will be in this register form for the moment */}
					<Route path="*" component={NotFound}/>
				</Switch>
			</Application>
		</Router>
	</Provider>
	), document.getElementById('container'));

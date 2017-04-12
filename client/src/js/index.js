// Libraries imported through Webpack
import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	withRouter
} from 'react-router-dom'

import createBrowserHistory from 'history/createBrowserHistory' // this works like this
const history = createBrowserHistory();

//REDUX imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Redux middleware
import thunk from 'redux-thunk'; // lets us dispatch() functions async
import logger from 'redux-logger'; // nice state console.logs

import AppReducer from './reducers';
import { fetchQuestions } from './actioncreators/questionActions'
import {requestUserDetails} from './actioncreators/authActions'
import Auth from './requests/auth';


// Components
import Application from './components/Application';
import NotFound  from './components/NotFound';
import QuestionList  from './components/QuestionList'
import QuestionView from './components/QuestionView';
import RegisterView from './components/RegisterView';
import LoginView from './components/LoginView';

const store = createStore(AppReducer, applyMiddleware(thunk, logger));
console.log('STORE state',store.getState())


store.dispatch(fetchQuestions()); // fetching questions at the highest level of the app

if(store.getState().auth.loggedIn && !store.getState().auth.user._id){
	store.dispatch(requestUserDetails())
}

const PrivateQuestionRoute = ({component, ...rest}) => {
	return (
		<Route {...rest} render={ props => {
				if(Auth.loggedIn()){
					return (
						React.createElement(component, props)
					)
				} else {
					return (
						<Redirect to={{
							pathname: '/login',
							state: {
								from: props.location.pathname, // redirect back after login
								//params : props.match.params
							}
							}}
						/>
					)}
			
		} }/>
	)
};


render((
	<Provider store={store}>
		<Router history={history}>
			<Application>
				<Switch>
					<Route path="/list" component={QuestionList}/>
					<PrivateQuestionRoute path="/question/:qId"
					                      component={QuestionView}/>
					<Route path="/login"  component={LoginView}/>
					<Route path="/register" component={RegisterView}/>
					<Route path="*" component={NotFound}/>
				</Switch>
			</Application>
		</Router>
	</Provider>
	), document.getElementById('container'));

import auth from './auth';
import questions from './questions';
import messages from './messages';

import {combineReducers} from 'redux';

export default combineReducers({auth, questions, messages});
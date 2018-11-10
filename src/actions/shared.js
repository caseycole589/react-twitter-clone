import { getInitialData } from '../utils/api.js';
import { recieveUsers } from '../actions/users';
import { recieveTweets } from '../actions/tweets';
import { setAuthedUser } from '../actions/authUser';
import { showLoading, hideLoading } from 'react-redux-loading';
const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => {
	return dispatch => {
		dispatch(showLoading());
		return getInitialData().then(({ users, tweets }) => {
			dispatch(recieveUsers(users));
			dispatch(recieveTweets(tweets));
			dispatch(setAuthedUser(AUTHED_ID));
			dispatch(hideLoading());
		});
	};
};

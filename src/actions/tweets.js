import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const RECIEVE_TWEETS = 'RECIEVE_TWEETS';
export const ADD_TWEET = 'ADD_TWEET';

export const recieveTweets = tweets => ({
	type: RECIEVE_TWEETS,
	tweets
});

export const toggleTweet = ({ id, authUser, hasLiked }) => ({
	type: TOGGLE_TWEET,
	id,
	authUser,
	hasLiked
});

export const addTweet = tweet => ({
	type: ADD_TWEET,
	tweet
});

export const handleAddTweet = (text, replyingTo) => {
	return (dispatch, getState) => {
		const { authUser } = getState();
		dispatch(showLoading());
		return saveTweet({
			text,
			author: authUser,
			replyingTo
		})
			.then(tweet => dispatch(addTweet(tweet)))
			.then(() => dispatch(hideLoading()));
	};
};

export const handleToggleTweet = info => dispatch => {
	dispatch(toggleTweet(info));
	return saveLikeToggle(info).catch(err => {
		console.warn('Error in handleToggleTweet', err);
		dispatch(toggleTweet(info));
		alert('there was an erro liking the tweet. Try Again');
	});
};

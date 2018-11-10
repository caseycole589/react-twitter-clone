import { saveLikeToggle } from '../utils/api';

export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const RECIEVE_TWEETS = 'RECIEVE_TWEETS';

export const recieveTweets = tweets => {
	return {
		type: RECIEVE_TWEETS,
		tweets
	};
};

export const toggleTweet = ({ id, authUser, hasLiked }) => {
	return {
		type: TOGGLE_TWEET,
		id,
		authUser,
		hasLiked
	};
};

export const handleToggleTweet = info => {
	return dispatch => {
		dispatch(toggleTweet(info));
		return saveLikeToggle(info).catch(err => {
			console.warn('Error in handleToggleTweet', err);
			dispatch(toggleTweet(info));
			alert('there was an erro liking the tweet. Try Again');
		});
	};
};

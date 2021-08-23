import userTypes from './user.types';

export const setCurrentUser = user => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

export const logoutUser = () => ({
	type: userTypes.LOGOUT_USER,
	payload: null,
});

import './user.types';
import userTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	signInSuccess: false,
	signUpError: [],
	signUpSuccess: false,
	resetPasswordSuccess: false,
	resetPasswordError: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userTypes.SET_CURRENT_USER:
			return { ...state, currentUser: action.payload };
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				signInSuccess: action.payload,
			};
		case userTypes.LOGOUT_USER:
			return { ...state, currentUser: null, signInSuccess: false };

		case userTypes.SIGN_UP_ERROR:
			return { ...state, signUpError: action.payload };
		case userTypes.SIGN_UP_SUCCESS:
			return { ...state, signUpSuccess: action.payload };
		case userTypes.RESET_PASSWORD_SUCCESS:
			return { ...state, resetPasswordSuccess: action.payload };
		case userTypes.RESET_PASSWORD_ERROR:
			return { ...state, resetPasswordError: action.payload };

		default:
			return state;
	}
};

export default userReducer;

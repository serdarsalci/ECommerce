import userTypes from './user.types';
import {
	auth,
	handleUserProfile,
	GoogleProvider,
} from './../../firebase/utils';
import { useDispatch } from 'react-redux';

export const setCurrentUser = user => ({
	type: userTypes.SET_CURRENT_USER,
	payload: user,
});

export const signInUser =
	({ email, password }) =>
	async dispatch => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			dispatch({
				type: userTypes.SIGN_IN_SUCCESS,
				payload: true,
			});
		} catch (err) {
			console.log(err);
		}
	};

export const signUpUser =
	({ displayName, email, password, confirmPassword }) =>
	async dispatch => {
		if (password !== confirmPassword) {
			const err = ['Passwords do not match'];
			dispatch({
				type: userTypes.SIGN_UP_ERROR,
				payload: err,
			});
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			let userTobe = { ...user, displayName };
			await handleUserProfile(userTobe);
			dispatch({
				type: userTypes.SIGN_UP_SUCCESS,
				payload: true,
			});
			// setState(initialState);
			// history.push('/');
		} catch (err) {
			console.log(err);
		}
	};

export const resetPassword =
	({ email }) =>
	async dispatch => {
		try {
			// const { email } = state;
			const config = {
				url: 'http://localhost:3000/login',
			};
			await auth.sendPasswordResetEmail(email, config);

			dispatch({
				type: userTypes.RESET_PASSWORD_SUCCESS,
				payload: true,
			});

			console.log('email sent');
		} catch (err) {
			dispatch({
				type: userTypes.RESET_PASSWORD_ERROR,
				payload: [err.message],
			});
		}
	};

export const signInWithGoogle = () => async dispatch => {
	try {
		console.log('useraction signinwith google called');
		await auth.signInWithPopup(GoogleProvider);
		dispatch({
			type: userTypes.SIGN_IN_SUCCESS,
			payload: true,
		});
	} catch (err) {
		console.log(err);
	}
};

export const logoutUser = () => ({
	type: userTypes.LOGOUT_USER,
	payload: null,
});

import React, { useEffect } from 'react';
import './styles.scss';
import FormInput from '../forms/Forminput';
import Button from '../forms/Button';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from './../../redux/User/user.actions';
// import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';

import { useState } from 'react';

let initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
};
const mapState = ({ user }) => ({
	signUpSuccess: user.signUpSuccess,
	signUpError: user.signUpError,
});

const Signup = () => {
	const { signUpSuccess, signUpError } = useSelector(mapState);
	const [state, setState] = useState(initialState);
	const { displayName, email, password, confirmPassword, errors } = state;
	const dispatch = useDispatch();
	const history = useHistory();

	const reset = () => {
		setState(initialState);
	};

	useEffect(() => {
		if (signUpSuccess) {
			reset();
			history.push('/');
		}
	}, [signUpSuccess]);

	useEffect(() => {
		if (Array.isArray(signUpError) && signUpError.length > 0) {
			setState({ ...state, errors: signUpError });
		}
	}, [signUpError]);

	const handleChange = e => {
		// console.log(e.target);
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
		// console.log(user.displayName);
	};

	const handleFormSubmit = e => {
		e.preventDefault();
		dispatch(
			signUpUser({
				displayName,
				email,
				password,
				confirmPassword,
			})
		);
	};

	const configAuthWrapper = {
		headline: 'Signup',
	};

	// const { displayName, email, password, confirmPassword, errors } = user;
	return (
		<AuthWrapper {...configAuthWrapper} errors={state.errors}>
			<div className='formWrap'>
				<form onSubmit={handleFormSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={state.displayName}
						placeholder='Full name'
						onChange={handleChange}
					/>
					<FormInput
						type='email'
						name='email'
						value={state.email}
						placeholder='Email'
						onChange={handleChange}
					/>
					<FormInput
						type='password'
						name='password'
						value={state.password}
						placeholder='Password'
						onChange={handleChange}
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						value={state.confirmPassword}
						placeholder='Confirm Password'
						onChange={handleChange}
					/>

					<Button type='submit'>Register</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default Signup;

import React, { Component } from 'react';
import './styles.scss';
import FormInput from '../forms/Forminput';
import Button from '../forms/Button';

import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';

import { useState } from 'react';

let initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	errors: [],
};

const Signup = () => {
	const [state, setState] = useState(initialState);
	const { displayName, email, password, confirmPassword, errors } = state;

	const handleChange = e => {
		// console.log(e.target);
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
		// console.log(user.displayName);
	};

	const handleFormSubmit = async e => {
		e.preventDefault();
		if (password !== confirmPassword) {
			const err = 'Passwords do not match';

			if (!errors.includes(err)) {
				setState({ ...state, [errors]: state.errors.push(err) });
				setTimeout(() => {
					setState({ ...state, [errors]: state.errors.pop() });
				}, 3000);
			}
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			let userTobe = { ...user, displayName };

			await handleUserProfile(userTobe);

			setState(initialState);
		} catch (err) {
			if (!errors.includes(err.message)) {
				setState({ ...state, [errors]: state.errors.push(err.message) });
				setTimeout(() => {
					setState({ ...state, [errors]: state.errors.pop() });
				}, 3000);
			}
		}
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

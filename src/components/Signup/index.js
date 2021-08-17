import React, { Component } from 'react';
import './styles.scss';
import FormInput from '../forms/Forminput';
import Button from '../forms/Button';

import { auth, handleUserProfile } from '../../firebase/utils';

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
				setState({ ...state, [errors]: errors.push(err) });
			}
			console.log(state.errors.length);
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			// console.log('user returned is ', user);

			let userTobe = { ...user, displayName };

			await handleUserProfile(userTobe);

			setState(initialState);
		} catch (error) {
			console.log(error);
		}
	};

	// const { displayName, email, password, confirmPassword, errors } = user;
	return (
		<div className='signup'>
			<div className='wrap'>
				<h2>Signup</h2>
				{/* <h2
				>{user.displayName}</h2> */}

				{errors.length > 0 && (
					<ul className='errors'>
						{errors.map((err, index) => {
							return <li key={index}>{err}</li>;
						})}
					</ul>
				)}
				<div className='formWrap'>
					<form onSubmit={handleFormSubmit}>
						<FormInput
							type='text'
							name='displayName'
							value={state.displayName}
							placeHolder='Full name'
							onChange={handleChange}
						/>
						<FormInput
							type='email'
							name='email'
							value={state.email}
							placeHolder='Email'
							onChange={handleChange}
						/>
						<FormInput
							type='password'
							name='password'
							value={state.password}
							placeHolder='Password'
							onChange={handleChange}
						/>
						<FormInput
							type='password'
							name='confirmPassword'
							value={state.confirmPassword}
							placeHolder='Confirm Password'
							onChange={handleChange}
						/>

						<Button type='submit'>Register</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;

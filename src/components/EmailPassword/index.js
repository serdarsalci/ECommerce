import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

import { auth } from '../../firebase/utils';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/Forminput';
import Button from '../forms/Button';

const EmailPassword = () => {
	const [state, setState] = useState({ email: '', errors: [] });
	const { email } = state;

	const history = useHistory();

	const handleChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value.trim(),
		});
	};
	
	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const { email } = state;
			const config = {
				url: 'http://localhost:3000/login',
			};
			await auth.sendPasswordResetEmail(email, config);

			console.log('email sent');
			history.push('/login');
		} catch (err) {
			console.log('Failed catch block');
			const error = ['Email not found. Please try again'];
			const { errors } = state;
			errors.push(error);

			setState({ ...state, errors: error });
			console.log(state.errors);
		}
	};
	const config = {
		headline: 'Email Password',
	};
	const { errors } = state;
	return (
		<AuthWrapper {...config}>
			<div className='formWrap'>
				{errors.length > 0 && (
					<ul>
						{errors.map((e, ind) => {
							return <li key={ind}>{e}</li>;
						})}
					</ul>
				)}

				<form onSubmit={handleSubmit}>
					<FormInput
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Email'
						value={email}></FormInput>
					<Button type='submit'>Email Password</Button>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default EmailPassword;

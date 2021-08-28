import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './../../redux/User/user.actions';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/Forminput';
import Button from '../forms/Button';

const mapState = ({ user }) => ({
	resetPasswordSuccess: user.resetPasswordSuccess,
	resetPasswordError: user.resetPasswordError,
});

const EmailPassword = () => {
	const [state, setState] = useState({ email: '', errors: [] });
	const { email } = state;
	const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);

	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		if (resetPasswordSuccess) {
			history.push('/login');
		}
	}, [resetPasswordSuccess]);

	useEffect(() => {
		if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
			setState({ errors: resetPasswordError });
		}
	}, [resetPasswordError]);

	const handleChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(resetPassword({ email }));

		// history.push('/login');
	};

	const config = {
		headline: 'Email Password',
	};
	const { errors } = state;
	return (
		<AuthWrapper {...config}>
			<div className='formWrap'>
				{resetPasswordError.length > 0 && (
					<ul>
						{resetPasswordError.map((e, ind) => {
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

import React, { useState } from 'react';
import './styles.scss';

import Buttons from '../../components/forms/Button';
import { signInWithGoogle, auth } from '../../firebase/utils';

import FormInput from '../forms/Forminput';

const initialState = {
	email: '',
	password: '',
};

const SignIn = () => {
	const [state, setState] = useState(initialState);
	const { email, password } = state;
	//
	const handleChange = e => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};
	//
	const handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = state;

		try {
			await auth.signInWithEmailAndPassword(email, password);

			setState(initialState);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='signin'>
			<div className='wrap'>
				<h2>Login</h2>
				<div className='formWrap'>
					<form onSubmit={handleSubmit}>
						<FormInput
							type='email'
							name='email'
							value={email}
							placeHolder='Email'
							handleChanged={handleChange}
						/>
						<FormInput
							type='password'
							name='password'
							value={password}
							placeHolder='Password'
							handleChanged={handleChange}
						/>
						<div className='socialSignin'>
							<div className='row'>
								<Buttons type='submit'>LogIn</Buttons>
							</div>
							<hr />
							<div className='row'>
								<Buttons onClick={signInWithGoogle}>
									Sign in with google
								</Buttons>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

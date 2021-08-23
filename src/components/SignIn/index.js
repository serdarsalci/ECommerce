import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Buttons from '../../components/forms/Button';
import { signInWithGoogle, auth } from '../../firebase/utils';

import FormInput from '../forms/Forminput';
import AuthWrapper from '../AuthWrapper';

const initialState = {
	email: '',
	password: '',
	errors: [],
};

const SignIn = () => {
	const [state, setState] = useState(initialState);
	const { email, password } = state;
	const history = useHistory();
	//
	const handleChange = e => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const { email, password, errors } = state;

		try {
			const credentials = await auth.signInWithEmailAndPassword(
				email,
				password
			);
			setState(initialState);
			history.push('/');
		} catch (err) {
			if (!errors.includes(err.message)) {
				errors.push(err.message);

				setState({ ...state, errors: errors });
				setTimeout(() => {
					errors.pop();
					setState({ ...state, errors: errors });
				}, 2000);
			}
		}
	};

	const configAuthWrapper = {
		headline: 'Login',
	};

	return (
		<AuthWrapper {...configAuthWrapper} errors={state.errors}>
			<div className='formWrap'>
				<form onSubmit={handleSubmit}>
					<FormInput
						type='email'
						name='email'
						value={email}
						placeholder='Email'
						handleChanged={handleChange}
					/>
					<FormInput
						type='password'
						name='password'
						value={password}
						placeholder='Password'
						handleChanged={handleChange}
					/>
					<div className='socialSignin'>
						<div className='row'>
							<Buttons type='submit'>LogIn</Buttons>
						</div>
						<hr />
						<div className='row'>
							<Buttons onClick={signInWithGoogle}>Sign in with google</Buttons>
						</div>
					</div>
					<div className='links'>
						<Link to='/recovery'>Forget Password</Link>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default SignIn;

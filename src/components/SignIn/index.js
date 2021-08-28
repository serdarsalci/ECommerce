import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Buttons from '../../components/forms/Button';
// import { signInWithGoogle } from '../../firebase/utils';

import FormInput from '../forms/Forminput';
import AuthWrapper from '../AuthWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signInWithGoogle } from '../../redux/User/user.actions';

const initialState = {
	email: '',
	password: '',
	errors: [],
};

const mapState = ({ user }) => ({
	signInSuccess: user.signInSuccess,
});

const SignIn = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { signInSuccess } = useSelector(mapState);
	const [state, setState] = useState(initialState);
	const { email, password } = state;

	useEffect(() => {
		if (signInSuccess) {
			setState(initialState);
			history.push('/');
		}
	}, [signInSuccess]);

	//
	const handleChange = e => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(signInUser({ email, password }));
	};

	const configAuthWrapper = {
		headline: 'Login',
	};

	const handleGoogleSignIn = e => {
		e.preventDefault();
		console.log('handleGoogle sign in called');
		dispatch(signInWithGoogle());
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
							<Buttons onClick={handleGoogleSignIn}>
								Sign in with google
							</Buttons>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';
import './styles.scss';
import Logo from '../../ assets/Sample-Logo.jpg';
import { capitilizeFirstLetter } from '../../ utils';
import { useHistory } from 'react-router';
import { logoutUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
	// const { currentUser } = props;
	const currentUser = useSelector(state => state.user.currentUser);

	// console.log(currentUser);
	const dispatch = useDispatch();

	const handleSignOut = async () => {
		await auth.signOut();
		dispatch(logoutUser());
	};

	return (
		<header className='header'>
			<div className='wrap'>
				<div className='logo'>
					<Link to='/'>
						<img src={Logo} alt='simple logo' />
					</Link>
				</div>
				<div className='callToActions'>
					{currentUser && (
						<ul>
							<li>Logged In {currentUser.displayName}</li>
							<li>
								<Link className='logout' onClick={handleSignOut}>
									LOGOUT
								</Link>
							</li>
							<li>
								<Link to='/dashboard'>My Account</Link>
							</li>
						</ul>
					)}
					{!currentUser && (
						<ul>
							<li>
								<Link to='/registration'>Register</Link>
							</li>
							<li>
								<Link to='/login'>Login</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	currentUser: null,
};

export default Header;

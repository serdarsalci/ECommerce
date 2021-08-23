import React, { useEffect, useState } from 'react';
import { auth, handleUserProfile } from './firebase/utils';
import { Route, Switch, Redirect } from 'react-router-dom';
import './default.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registation from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Recovery from './pages/Recovery';
import { setCurrentUser } from './redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
	currentUser: null,
	authListener: null,
};

const App = () => {
	const [state, setState] = useState(initialState);

	// let authListener = null;

	const dispatch = useDispatch();

	useEffect(() => {
		let authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);

				userRef.onSnapshot(snapshot => {
					console.log('snapshot');
					console.log(snapshot.data().displayName);
					dispatch(
						setCurrentUser({
							id: snapshot.id,
							...snapshot.data(),
						})
					);
				});
			}
			setCurrentUser(userAuth);
		});

		return authListener;
	}, []);

	const currentUser = useSelector(stat => stat.user.currentUser);
	// console.log(currentUser);
	return (
		<div className='App'>
			<Switch>
				<Route
					exact
					path='/'
					render={() => (
						<HomePageLayout currentUser={currentUser}>
							<Homepage />
						</HomePageLayout>
					)}
				/>
				<Route
					exact
					path='/registration'
					render={() =>
						currentUser ? (
							<Redirect to='/' />
						) : (
							<MainLayout currentUser={currentUser}>
								<Registation />
							</MainLayout>
						)
					}
				/>
				<Route
					exact
					path='/login'
					render={() =>
						currentUser ? (
							<Redirect to='/' />
						) : (
							<MainLayout currentUser={currentUser}>
								<Login />
							</MainLayout>
						)
					}
				/>
				<Route
					exact
					path='/logout'
					render={() => (
						<MainLayout>
							<Logout />
						</MainLayout>
					)}
				/>
				<Route
					path='/recovery'
					render={() => (
						<MainLayout>
							<Recovery />
						</MainLayout>
					)}
				/>
			</Switch>
		</div>
	);
};

export default App;

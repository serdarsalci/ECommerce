import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, handleUserProfile } from './firebase/utils';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage';
import Registation from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import { setCurrentUser } from './redux/User/user.actions';
import WithAuth from './hoc/withAuth';

const initialState = {
	currentUser: null,
	authListener: null,
};

const App = () => {
	// const [state, setState] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(
					snapshot => {
						console.log('snapshot');
						console.log(snapshot.data().displayName);
						dispatch(
							setCurrentUser({
								id: snapshot.id,
								...snapshot.data(),
							})
						);
					},
					onError => {
						console.log('error happened');
					}
				);
			}
			setCurrentUser(userAuth);
		});

		return () => {
			authListener();
		};
	}, []);

	const currentUser = useSelector(state => state.user.currentUser);
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
					render={() => (
						<MainLayout currentUser={currentUser}>
							<Registation />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path='/login'
					render={() => (
						<MainLayout currentUser={currentUser}>
							<Login />
						</MainLayout>
					)}
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
				<Route
					path='/dashboard'
					render={() => (
						<WithAuth>
							<MainLayout>
								<Dashboard />
							</MainLayout>
						</WithAuth>
					)}
				/>
			</Switch>
		</div>
	);
};

export default App;

import React, { useEffect, useState, Component } from 'react';
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

const initialState = {
	currentUser: null,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
	}

	authListener = null;

	componentDidMount() {
		this.authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					this.setState({
						currentUser: { id: snapshot.id, ...snapshot.data() },
					});
				});
			}

			this.setState({
				...initialState,
			});
		});
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { currentUser } = this.state;
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
				</Switch>
			</div>
		);
	}
}

export default App;

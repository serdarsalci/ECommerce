import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Registation from './pages/Registration';
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';
import Login from './pages/Login';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route
					exact
					path='/'
					render={() => (
						<HomePageLayout>
							<Homepage />
						</HomePageLayout>
					)}
				/>
				<Route
					exact
					path='/registration'
					render={() => (
						<MainLayout>
							<Registation />
						</MainLayout>
					)}
				/>
				<Route
					exact
					path='/login'
					render={() => (
						<MainLayout>
							<Login />
						</MainLayout>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
